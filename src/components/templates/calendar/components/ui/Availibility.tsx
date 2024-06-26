import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  HStack,
  Highlight,
  IconButton,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { addDays, isEqual, isPast, subDays } from "date-fns";
import { FC, memo } from "react";
import { calendarActions } from "../../model/calendarSlice";
import { getObjectAvailibility } from "../../model/selectors";
import { CalendarAvailability } from "../../model/types";
import { useAvailibility } from "../../model/useAvailibility";
import { isOverlaping } from "../../utils/isOverlaping";
import { EventPopover } from "./EventPopover";

import { useSearchFullname } from "../../model/useSearchFullname";
import { useAppSelector } from "../shared/hooks/useAppSelecter";
import { useAppDispatch } from "../shared/hooks/useAppDispatch";

export const Availibility: FC<CalendarAvailability> = memo(
  (props) => {
    const { color, id, objectId, clientFullname, minDate, maxDate } = props;
    const [isLessThan968] = useMediaQuery("(max-width: 968px)");
    const { width, isVisible, isLeftRounded, isRightRounded, leftPadding } =
      useAvailibility(id, objectId);
    const availabilities = useAppSelector(getObjectAvailibility(objectId));
    const { query } = useSearchFullname();

    const dispatch = useAppDispatch();

    const onLeft = () => {
      const isCanMove = availabilities
        .filter((a) => {
          return isOverlaping(
            {
              start: subDays(minDate, 1),
              end: subDays(maxDate, 1),
            },
            {
              start: a.minDate,
              end: a.maxDate,
            }
          );
        })
        .filter((a) => a.id != id);

      if (isCanMove.length == 0 && !isPast(minDate)) {
        dispatch(
          calendarActions.editAvailabilityDates({
            id,
            minDate: subDays(minDate, 1),
            maxDate: subDays(maxDate, 1),
            objectId,
          })
        );
      }
    };

    const onRight = () => {
      const isCanMove = availabilities
        .filter((a) => {
          return isOverlaping(
            {
              start: addDays(minDate, 1),
              end: addDays(maxDate, 1),
            },
            {
              start: a.minDate,
              end: a.maxDate,
            }
          );
        })
        .filter((a) => a.id != id);
      if (isCanMove.length == 0) {
        dispatch(
          calendarActions.editAvailabilityDates({
            id,
            minDate: addDays(minDate, 1),
            maxDate: addDays(maxDate, 1),
            objectId,
          })
        );
      }
    };

    if (!isVisible) {
      return <></>;
    }
    return (
      <>
        <EventPopover id={id} objectId={objectId}>
          <HStack
            pos={"absolute"}
            h={"20px"}
            {...(isLeftRounded && { roundedLeft: "md" })}
            {...(isRightRounded && { roundedRight: "md" })}
            left={`${leftPadding}px`}
            w={`${width}px`}
            bgColor={color}
            alignItems={"center"}
            p={2}
            cursor={"pointer"}
            role="group"
          >
            <Text
              fontSize={"sm"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              fontWeight={"medium"}
              color={"white"}
            >
              <Highlight
                styles={{ bg: "red.600", color: "white" }}
                query={query}
              >
                {clientFullname}
              </Highlight>
            </Text>
            {!isLessThan968 && isLeftRounded && (
              <IconButton
                pos="absolute"
                isRound
                bgColor={color}
                aria-label="move left"
                left={"-32px"}
                w="20px"
                minH={"20px"}
                onClick={(e) => {
                  e.stopPropagation();
                  onLeft();
                }}
                zIndex={"9"}
                color={"white"}
                transform={"translateX(20px)"}
                opacity={0}
                pointerEvents={"none"}
                _groupHover={{
                  transform: "translateX(0px)",
                  opacity: 1,
                  pointerEvents: "auto",
                }}
                _hover={{
                  bgColor: color,
                }}
              >
                <ChevronLeftIcon w="5" h="5" />
              </IconButton>
            )}
            {!isLessThan968 && isRightRounded && (
              <IconButton
                pos="absolute"
                isRound
                bgColor={color}
                aria-label="move left"
                right={"-32px"}
                w="20px"
                minH={"20px"}
                onClick={(e) => {
                  e.stopPropagation();
                  onRight();
                }}
                zIndex={"9"}
                transform={"translateX(-20px)"}
                color={"white"}
                opacity={0}
                pointerEvents={"none"}
                _groupHover={{
                  transform: "translateX(0px)",
                  opacity: 1,
                  pointerEvents: "auto",
                }}
                _hover={{
                  bgColor: color,
                }}
              >
                <ChevronRightIcon w="5" h="5" />
              </IconButton>
            )}
          </HStack>
        </EventPopover>
      </>
    );
  },
  (oldProps, newProps) => {
    return (
      oldProps.comment === newProps.comment &&
      isEqual(oldProps.minDate, newProps.minDate) &&
      isEqual(oldProps.maxDate, newProps.maxDate) &&
      oldProps.id == newProps.id &&
      oldProps.color == newProps.color &&
      oldProps.objectId == newProps.objectId &&
      isEqual(oldProps.createdDate, newProps.createdDate) &&
      oldProps.totalSum == newProps.totalSum &&
      oldProps.clientFullname == newProps.clientFullname &&
      oldProps.phoneNumber == newProps.phoneNumber
    );
  }
);
