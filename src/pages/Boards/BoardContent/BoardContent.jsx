/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  getFirstCollision,
  MouseSensor,
  pointerWithin,
  // PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import { cloneDeep, isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatter";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "COLUMN",
  CARD: "CARD",
};

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10,
  //   },
  // });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });
  // const sensors = useSensors(pointerSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumns, setOrderedColumns] = useState([]);

  //Cung mot thoi diem chi co 1 item duoc drag {column hoac card}
  const [activeDragItemId, setActiveDragItemId] = useState(null);

  const [activeDragItemType, setActiveDragItemType] = useState(null);

  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumns, setOldColumns] = useState(null);

  //Diem va cham cuoi cung truoc do (xu ly bug thuat toan phat hien va cham)
  const lastOverId = useRef(null);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "id"));
  }, [board]);

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card.id)?.includes(cardId)
    );
  };

  const moveCardBetweenDifferentColumns = (
    activeColumn,
    overColumn,
    overCardId,
    active,
    over,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      //Tim vi tri (index) cua overCard trong overColumn
      const overCardIndex = overColumn?.cards.findIndex(
        (card) => card.id === overCardId
      );
      // console.log("overCardIndex", overCardIndex);

      //Logic tinh toan "cardIndex moi" (tren hoac duoi overCard) lay chuan ra tu code cua thu vien
      let newCardIndex;
      const isBellowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBellowOverItem ? 1 : 0;

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards.length + 1;

      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find(
        (column) => column.id === activeColumn.id
      );
      const nextOverColumn = nextColumns.find(
        (column) => column.id === overColumn.id
      );

      if (nextActiveColumn) {
        //Xoa card khoi column active
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card.id !== activeDraggingCardId
        );

        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }

        //Cap nhat lai cardOrderIds cua column active
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card.id
        );
      }

      if (nextOverColumn) {
        //Kiem tra neu card da ton tai trong column over thi bo qua
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card.id !== activeDraggingCardId
        );

        const rebuildActiveDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn.id,
        };
        //Chen card vao column over
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuildActiveDraggingCardData
        );

        //Xoa placeholder card neu co
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_PlaceholderCard
        );

        //Cap nhat lai cardOrderIds cua column over
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card.id
        );
      }

      return nextColumns;
    });
  };

  const handleDragStart = (event) => {
    // console.log(event);
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);

    //Neu la keo card thi moi thuc hien set gia tri cho oldColumns
    if (event?.active?.data?.current?.columnId) {
      setOldColumns(findColumnByCardId(event?.active?.id));
    }
  };

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return;
    }

    const { active, over } = event;

    if (!active || !over) {
      return;
    }

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    // console.log("active", activeColumn);
    // console.log("over", overColumn);

    if (activeDraggingCardId === overCardId) {
      return;
    }

    if (!overColumn) {
      return;
    }

    if (activeColumn.id !== overColumn.id) {
      moveCardBetweenDifferentColumns(
        activeColumn,
        overColumn,
        overCardId,
        active,
        over,
        activeDraggingCardId,
        activeDraggingCardData
      );
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over) {
      return;
    }

    //Xu ly keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      // console.log("active", activeColumn);
      // console.log("over", overColumn);

      if (activeDraggingCardId === overCardId) {
        return;
      }

      if (!overColumn) {
        return;
      }

      //Hanh dong keo tha card giua 2 column khac nhau
      //Phai dung toi activeDragItemData (set vao state tu buoc handleDragStart) chu khong phai activeData
      //trong scope handleDragEnd nay vi sau khi di qua onDragOver la state cua card da bi cap nhap 1 lan
      if (oldColumns.id !== overColumn.id) {
        if (activeColumn.id !== overColumn.id) {
          moveCardBetweenDifferentColumns(
            activeColumn,
            overColumn,
            overCardId,
            active,
            over,
            activeDraggingCardId,
            activeDraggingCardData
          );
        }
      } else {
        const oldCardIndex = oldColumns.cards.findIndex(
          (c) => c.id === activeDragItemId
        );
        const newCardIndex = overColumn.cards.findIndex(
          (c) => c.id === overCardId
        );

        const dndOrderedCards = arrayMove(
          oldColumns.cards,
          oldCardIndex,
          newCardIndex
        );
        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          const nextOverColumn = nextColumns.find(
            (c) => c.id === overColumn.id
          );
          //Cap nhat lai cardOrderIds cua column over
          if (nextOverColumn) {
            nextOverColumn.cards = dndOrderedCards;
            nextOverColumn.cardOrderIds = dndOrderedCards.map((c) => c.id);
          }

          return nextColumns;
        });
      }
    }

    //Xu ly keo tha column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        //Lay vi tri cu tu active
        const oldIndex = orderedColumns.findIndex((c) => c.id === active.id);
        //Lay vi tri moi tu over
        const newIndex = orderedColumns.findIndex((c) => c.id === over.id);

        const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
        // const dndColumnOrderIds = dndOrderedColumns.map((c) => c.id);

        setOrderedColumns(dndOrderedColumns);
      }
    }

    //Clear du lieu sau khi keo tha xong
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumns(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: 0.5,
        },
      },
    }),
  };

  //args = arguments
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }

      //Tim cac diem giao nhau, va cham - intersections voi con tro
      const pointerIntersection = pointerWithin(args);
      if (!pointerIntersection?.length) {
        return;
      }
      // const intersections = !!pointerIntersection?.length
      //   ? pointerIntersection
      //   : rectIntersection(args);

      //Tim overId dau tien trong intersections
      let overId = getFirstCollision(pointerIntersection, "id");
      if (overId) {
        const checkColumn = orderedColumns.find(
          (column) => column.id === overId
        );

        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                checkColumn?.cardOrderIds?.includes(container.id)
            ),
          })[0]?.id;
        }

        lastOverId.current = overId;
        return [{ id: overId }];
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumns]
  );

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      //Thuat toan phat hien va cham
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
    >
      <Box
        sx={{
          width: "100%",
          height: (theme) => theme.trelloCustomizations.boardContentHeight,
          display: "flex",
          // alignItems: "center",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column key={activeDragItemId} column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card key={activeDragItemId} card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
