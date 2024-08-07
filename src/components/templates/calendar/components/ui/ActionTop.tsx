import {
  Grid,
  GridItem,
  HStack,
  Hide,
  IconButton,
  Show,
  useMediaQuery,
} from "@chakra-ui/react";

import { memo } from "react";
import { calendarActions } from "../..";
import { getObjectsBySearchAvailibility } from "../../model/selectors";
import { EventClickProps } from "../../model/types";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../shared/hooks/useAppDispatch";
import { useAppSelector } from "../shared/hooks/useAppSelecter";
import { GoToDateBtn } from "./GoToDateBtn";
import { GoToMonth } from "./GoToMonth";
import { GoTodayBtn } from "./GoTodayBtn";
import { NewBookingBtn } from "./NewBookingBtn";
import { SearchAvailibilityRoomsBtn } from "./SearchAvailibilityRoomsBtn";
import { SearchComment } from "./SearchComment";

export const ActionTop = memo(() => {
  const dispatch = useAppDispatch();
  const [isLessThan968] = useMediaQuery("(max-width: 968px)");
  const availabilities = useAppSelector(getObjectsBySearchAvailibility);

  const onEventClick = ({ availibilityInfo }: EventClickProps) => {
    dispatch(calendarActions.setBeginDate(availibilityInfo.minDate));
  };

  const onPrev = () => {
    dispatch(calendarActions.decreaseStep());
  };
  const onNext = () => {
    dispatch(calendarActions.increaseStep());
  };
  return (
    <GridItem area={"actionsTop"}>
      <Grid gridTemplateColumns={isLessThan968 ? "1fr" : "1fr 300px"}>
        <GridItem>
          <HStack p={isLessThan968 ? 2 : 4}>
            <GoToMonth />

            <Hide breakpoint="(max-width: 968px)">
              <GoToDateBtn />
            </Hide>
            <GoTodayBtn />
          </HStack>
          <HStack
            px={2}
            {...(isLessThan968 && {
              flexWrap: "wrap",
            })}
          >
            <NewBookingBtn />

            <SearchComment
              onEventClick={onEventClick}
              includesAvailabilities={availabilities}
            />
          </HStack>
        </GridItem>
        <GridItem p={2}></GridItem>
        <Show breakpoint="(max-width: 968px)">
          <HStack justifyContent={"center"}>
            <SearchAvailibilityRoomsBtn />
          </HStack>

          <HStack px={4} justifyContent={"space-between"} w="full" mt={3}>
            <IconButton
              aria-label="left arrow"
              onClick={onPrev}
              isRound
              bgColor={"white"}
              fontSize={"xl"}
              size={"lg"}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              aria-label="right arrow"
              onClick={onNext}
              isRound
              bgColor={"white"}
              fontSize={"xl"}
              size={"lg"}
            >
              <ChevronRightIcon />
            </IconButton>
          </HStack>
        </Show>
      </Grid>
    </GridItem>
  );
});
