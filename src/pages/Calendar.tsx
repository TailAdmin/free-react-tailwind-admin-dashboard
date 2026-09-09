import type {
  CalendarRef,
  DateSelectInfo,
  DatesSetInfo,
  EventClickInfo,
  EventInput,
} from "@fullcalendar/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import multiMonthPlugin from "@fullcalendar/react/multimonth";
import themePlugin from "@fullcalendar/react/themes/classic";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// FullCalendar v7 CSS imports
import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/palette.css";
import "@fullcalendar/react/themes/classic/theme.css";

import PageMeta from "../components/common/PageMeta";
import { Modal } from "../components/ui/modal";
import { useLanguage } from "../context/LanguageContext";
import { useClickOutside } from "../hooks/useClickOutside";
import { useModal } from "../hooks/useModal";

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
  };
}

interface DayHeaderArg {
  date: Date;
  isToday?: boolean;
  inPopover?: boolean;
}

interface DayCellArg {
  date: Date;
  isToday?: boolean;
  isOther?: boolean;
  inPopover?: boolean;
}

interface MoreLinkArg {
  num: number;
  text: string;
}

interface EventInfoArg {
  event: {
    title: string;
    allDay?: boolean;
    extendedProps?: {
      calendar?: string;
    };
  };
  timeText?: string;
  view?: {
    type?: string;
  };
}

const viewOptions = [
  { key: "multiMonthYear", label: "Year" },
  { key: "dayGridMonth", label: "Month" },
  { key: "timeGridWeek", label: "Week" },
  { key: "timeGridDay", label: "Day" },
];

const colorMap: Record<
  string,
  { bg: string; dot: string; title: string; time: string }
> = {
  success: {
    bg: "border border-success-100 bg-success-50 dark:border-success-500/20 dark:bg-success-500/15",
    dot: "bg-success-500",
    title: "text-success-700 dark:text-success-400",
    time: "text-success-600/80 dark:text-success-400/80",
  },
  danger: {
    bg: "border border-error-100 bg-error-50 dark:border-error-500/20 dark:bg-error-500/15",
    dot: "bg-error-500",
    title: "text-error-700 dark:text-error-400",
    time: "text-error-600/80 dark:text-error-400/80",
  },
  primary: {
    bg: "border border-brand-100 bg-brand-50 dark:border-brand-500/20 dark:bg-brand-500/15",
    dot: "bg-brand-500",
    title: "text-brand-700 dark:text-brand-400",
    time: "text-brand-600/80 dark:text-brand-400/80",
  },
  warning: {
    bg: "border border-orange-100 bg-orange-50 dark:border-orange-500/20 dark:bg-orange-500/15",
    dot: "bg-orange-500",
    title: "text-orange-700 dark:text-orange-400",
    time: "text-orange-600/80 dark:text-orange-400/80",
  },
};

const calendarsEvents = {
  Danger: "danger",
  Success: "success",
  Primary: "primary",
  Warning: "warning",
};

interface CalendarViewDropdownProps {
  currentView: string;
  onViewChange: (viewKey: string) => void;
}

const CalendarViewDropdown: React.FC<CalendarViewDropdownProps> = ({
  currentView,
  onViewChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const activeOption =
    viewOptions.find((v) => v.key === currentView) ||
    viewOptions.find((v) => v.key === "dayGridMonth") ||
    viewOptions[1];

  return (
    <div ref={dropdownRef} className="calendar-view-dropdown relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="calendar-view-btn flex h-9 w-full min-w-20 items-center justify-center gap-1.5 rounded-lg border border-gray-300 ps-3 pe-2 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="calendar-view-label">{activeOption.label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`calendar-view-chevron h-4.5 w-4.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {isOpen && (
        <div className="calendar-view-menu absolute inset-e-0 z-50 mt-1.5 w-38 space-y-0.5 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {viewOptions.map((view) => (
            <button
              key={view.key}
              type="button"
              onClick={() => {
                onViewChange(view.key);
                setIsOpen(false);
              }}
              className={`calendar-view-option w-full rounded-lg px-2.5 py-1.5 text-start text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5 ${
                currentView === view.key
                  ? "bg-gray-100 font-medium dark:bg-white/5"
                  : "font-normal"
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const getInitialEvents = (): CalendarEvent[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);
  const threeDaysAfter = new Date(today);
  threeDaysAfter.setDate(threeDaysAfter.getDate() + 3);

  return [
    {
      id: "1",
      title: "Event Conf.",
      start: today.toISOString().split("T")[0],
      extendedProps: { calendar: "Danger" },
    },
    {
      id: "2",
      title: "Meeting",
      start: tomorrow.toISOString().split("T")[0],
      extendedProps: { calendar: "Success" },
    },
    {
      id: "3",
      title: "Workshop",
      start: dayAfter.toISOString().split("T")[0],
      end: threeDaysAfter.toISOString().split("T")[0],
      extendedProps: { calendar: "Primary" },
    },
  ];
};

const Calendar: React.FC = () => {
  const { dir, language } = useLanguage();
  const locale = language || "en";
  const isRtl = dir === "rtl";

  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("Primary");
  const [toolbarEndEl, setToolbarEndEl] = useState<HTMLElement | null>(null);

  const [events, setEvents] = useState<CalendarEvent[]>(() =>
    getInitialEvents(),
  );

  const calendarRef = useRef<CalendarRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("Primary");
    setSelectedEvent(null);
  };

  const handleOpenAddModal = useCallback(() => {
    resetModalFields();
    const currentDate = new Date();
    const yyyy = currentDate.getFullYear();
    const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
    const dd = String(currentDate.getDate()).padStart(2, "0");
    const combineDate = `${yyyy}-${mm}-${dd}`;

    setEventStartDate(combineDate);
    setEventEndDate(combineDate);
    setEventLevel("Primary");
    openModal();
  }, [openModal]);

  const handleDateSelect = (selectInfo: DateSelectInfo) => {
    resetModalFields();
    const start = selectInfo.startStr ? selectInfo.startStr.split("T")[0] : "";
    const end = selectInfo.endStr ? selectInfo.endStr.split("T")[0] : start;

    setEventStartDate(start);
    setEventEndDate(end);
    setEventLevel("Primary");
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickInfo) => {
    const event = clickInfo.event;
    if (event.url) {
      window.open(event.url);
      clickInfo.jsEvent.preventDefault();
      return;
    }

    const calLevel = (event.extendedProps?.calendar as string) || "Primary";
    const start = event.startStr ? event.startStr.split("T")[0] : "";
    const end = event.endStr ? event.endStr.split("T")[0] : start;

    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      extendedProps: { calendar: calLevel },
    });
    setEventTitle(event.title);
    setEventStartDate(start);
    setEventEndDate(end);
    setEventLevel(calLevel);
    openModal();
  };

  const handleAddOrUpdateEvent = () => {
    const titleVal =
      eventTitle.trim() || (selectedEvent ? "Event" : "New Event");
    const startDateVal = eventStartDate;
    const endDateVal = eventEndDate || startDateVal;
    const levelVal = eventLevel || "Primary";

    if (selectedEvent) {
      setEvents((prev) =>
        prev.map((ev) =>
          String(ev.id) === String(selectedEvent.id)
            ? {
                ...ev,
                title: titleVal,
                start: startDateVal,
                end: endDateVal,
                extendedProps: { calendar: levelVal },
              }
            : ev,
        ),
      );
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: titleVal,
        start: startDateVal,
        end: endDateVal,
        allDay: true,
        extendedProps: { calendar: levelVal },
      };
      setEvents((prev) => [...prev, newEvent]);
    }
    closeModal();
    resetModalFields();
  };

  const handleViewChange = (viewKey: string) => {
    setCurrentView(viewKey);
    calendarRef.current?.getApi()?.changeView(viewKey);
  };

  const handleDatesSet = (arg: DatesSetInfo) => {
    setCurrentView(arg.view.type);
    requestAnimationFrame(() => {
      const chunk = containerRef.current?.querySelector(
        ".ta-toolbar-section:last-child",
      ) as HTMLElement | null;
      if (chunk) {
        setToolbarEndEl(chunk);
      }
    });
  };

  useEffect(() => {
    const chunk = containerRef.current?.querySelector(
      ".ta-toolbar-section:last-child",
    ) as HTMLElement | null;
    if (chunk) {
      setToolbarEndEl(chunk);
    }
  }, []);

  const renderEventContent = (eventInfo: EventInfoArg) => {
    const calendarLevel = (
      eventInfo.event.extendedProps?.calendar || "primary"
    ).toLowerCase();

    const colors = colorMap[calendarLevel] || colorMap["primary"];
    const isTimeGridView =
      !eventInfo.event?.allDay &&
      eventInfo.view?.type &&
      eventInfo.view.type.startsWith("timeGrid");

    if (isTimeGridView) {
      return {
        html: `
          <div dir="ltr" class="event-fc-color flex h-full w-full flex-col justify-start overflow-hidden rounded-lg p-1.5 transition-colors ${colors.bg}">
            <div class="flex items-center gap-1.5">
              <div class="size-2 shrink-0 rounded-full ${colors.dot}"></div>
              <div class="truncate text-xs font-semibold leading-tight ${colors.title}">${eventInfo.event.title || ""}</div>
            </div>
            ${
              eventInfo.timeText
                ? `<div class="mt-0.5 truncate ps-3.5 text-[11px] font-medium leading-tight ${colors.time}">${eventInfo.timeText}</div>`
                : ""
            }
          </div>
        `,
      };
    }

    return {
      html: `
        <div dir="ltr" class="event-fc-color flex items-center rounded-lg py-1.5 ps-2.5 pe-3 transition-colors ${colors.bg}">
          <div class="fc-daygrid-event-dot ms-0 me-2 h-3.5 w-1 shrink-0 rounded-full border-none ${colors.dot}"></div>
          ${
            eventInfo.timeText
              ? `<div class="fc-event-time me-1.5 p-0 text-xs font-normal text-gray-500 dark:text-gray-400">${eventInfo.timeText}</div>`
              : ""
          }
          <div class="fc-event-title truncate p-0 text-xs font-medium text-gray-700 dark:text-white">${eventInfo.event.title || ""}</div>
        </div>
      `,
    };
  };

  return (
    <>
      <PageMeta
        title="React.js Calendar Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div
        ref={containerRef}
        className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3"
      >
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[
              themePlugin,
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              multiMonthPlugin,
            ]}
            initialView="dayGridMonth"
            direction={isRtl ? "rtl" : "ltr"}
            headerToolbar={{
              start: "prev,next addEventButton",
              center: "title",
              end: "",
            }}
            headerToolbarClass="sticky top-0! flex-col gap-4 z-20! [padding-inline:24px]! pt-6 sm:flex-row"
            toolbarTitleClass="text-lg! font-medium! text-gray-800 dark:text-white/90"
            toolbarSectionClass="ta-toolbar-section"
            buttonGroupClass="gap-2"
            buttons={{
              prev: {
                iconContent: {
                  html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6 bg-transparent text-gray-700 rtl:rotate-180 dark:text-gray-400"><path d="M15 18l-6-6 6-6" /></svg>`,
                },
                className:
                  "flex size-10! p-0! items-center justify-center! rounded-lg! border! bg-transparent! border-gray-200! text-gray-700 hover:border-gray-200 hover:bg-gray-50! focus:shadow-none active:border-gray-200! active:bg-transparent! active:shadow-none! dark:border-gray-800! dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900! dark:active:border-gray-800!",
              },
              next: {
                iconContent: {
                  html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6 bg-transparent text-gray-700 rtl:rotate-180 dark:text-gray-400"><path d="M9 18l6-6-6-6" /></svg>`,
                },
                className:
                  "flex size-10! p-0! items-center justify-center! rounded-lg! border! bg-transparent! border-gray-200! text-gray-700 hover:border-gray-200 hover:bg-gray-50! focus:shadow-none active:border-gray-200! active:bg-transparent! active:shadow-none! dark:border-gray-800! dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900! dark:active:border-gray-800!",
              },
              addEventButton: {
                text: "Add Event +",
                click: handleOpenAddModal,
                className:
                  "rounded-lg! border-0! bg-brand-500! px-4! py-2.5! text-sm! font-medium! text-white hover:bg-brand-600! focus:shadow-none! w-auto!",
              },
            }}
            views={{
              multiMonthYear: {
                aspectRatio: 1.2,
                contentHeight: "auto",
                height: "auto",
                multiMonthMaxColumns: 3,
                tableClass: "overflow-hidden! rounded-lg!",
                singleMonthMinWidth: 320,
                showNonCurrentDates: true,
                singleMonthHeaderInnerClass:
                  "text-sm font-medium! text-gray-800 dark:text-white/90",
                dayHeaderClass: (data: DayHeaderArg) =>
                  data.inPopover
                    ? "relative! border-b! border-gray-200! bg-gray-50/70! px-4! py-3! text-start! dark:border-gray-800! dark:bg-gray-800/50!"
                    : "border-0! bg-gray-50 py-2! dark:bg-gray-900",
                dayHeaderInnerClass: (data: DayHeaderArg) =>
                  data.inPopover
                    ? "text-sm! font-semibold! text-gray-800! dark:text-white/90!"
                    : "py-1 text-xs font-medium text-gray-400 uppercase",
                dayCellClass: (data: DayCellArg) => {
                  if (data.inPopover) return "bg-transparent! p-3!";
                  let cls = "relative! p-0.5 sm:p-1!";
                  if (data.isToday)
                    cls += " isolate bg-gray-100! font-semibold text-brand-500";
                  if (data.isOther) cls += " bg-transparent!";
                  return cls;
                },
                dayCellInnerClass: (data: DayCellArg) =>
                  data.inPopover
                    ? "flex custom-scrollbar max-h-60 flex-col gap-1.5 overflow-y-auto"
                    : "",
                dayCellTopInnerClass: "text-sm!",
                dayMaxEvents: 0,
                rowMoreLinkClass:
                  "absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!",
                rowMoreLinkInnerClass: "overflow-visible!",
                moreLinkContent() {
                  return {
                    html: `<span><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5.5 text-brand-500"><path d="M19 3v17a1 1 0 01-1.496.868l-4.512-2.578a2 2 0 00-1.984 0l-4.512 2.578A1 1 0 015 20V3z" /></svg></span>`,
                  };
                },
              },
              dayGridMonth: {
                dayMaxEvents: 2,
                dayHeaderAlign: (data: { inPopover?: boolean }) =>
                  data.inPopover ? "start" : "center",
                dayHeaderClass: (data: DayHeaderArg) =>
                  data.inPopover
                    ? "relative! border-b! border-gray-200! bg-gray-50/70! px-4! py-3! text-start! dark:border-gray-800! dark:bg-gray-800/50!"
                    : "border-x-0! border-t border-gray-200! bg-gray-50 dark:border-gray-800! dark:bg-gray-900",
                dayHeaderInnerClass: (data: DayHeaderArg) =>
                  data.inPopover
                    ? "text-sm! font-semibold! text-gray-800! dark:text-white/90!"
                    : "px-5! py-4! text-sm font-medium text-gray-400 uppercase",
                dayCellClass: (data: DayCellArg) => {
                  if (data.inPopover) return "bg-transparent! p-3!";
                  return `bg-transparent! p-2! ${
                    data.isToday ? "bg-gray-100! dark:bg-gray-800/40!" : ""
                  }`;
                },
                dayCellInnerClass: (data: DayCellArg) => {
                  if (data.inPopover)
                    return "flex custom-scrollbar max-h-60 flex-col gap-1.5 overflow-y-auto";
                  return data.isToday ? "rounded-sm!" : "";
                },
                moreLinkClass:
                  "border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none",
                moreLinkContent(args: MoreLinkArg) {
                  return {
                    html: `<span class="fc-more-link-badge inline-flex items-center rounded-sm bg-brand-50 px-1.5 py-0.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-100 dark:bg-brand-500/15 dark:text-brand-400 dark:hover:bg-brand-500/25">+${args.num} more</span>`,
                  };
                },
              },
              timeGridWeek: {
                slotDuration: "01:00:00",
                slotMinHeight: 56,
                allDaySlot: true,
                dayHeaderContent: (arg: DayHeaderArg) => {
                  const weekday = new Intl.DateTimeFormat(locale, {
                    weekday: "short",
                  })
                    .format(arg.date)
                    .toUpperCase();
                  const day = new Intl.DateTimeFormat(locale, {
                    day: "numeric",
                  }).format(arg.date);
                  return `${weekday} - ${day}`;
                },
                dayHeaderClass: (data: DayHeaderArg) =>
                  `border-0! bg-gray-50! dark:bg-gray-900! ${
                    data.isToday ? "bg-gray-100/70! dark:bg-gray-800/60!" : ""
                  }`,
                dayHeaderInnerClass: (data: DayHeaderArg) =>
                  `px-3! py-3.5! text-center! text-xs! font-medium! text-gray-500! uppercase! dark:text-gray-400! ${
                    data.isToday
                      ? "font-semibold! text-brand-500! dark:text-brand-400!"
                      : ""
                  }`,
                slotHeaderDividerClass:
                  "border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!",
                slotHeaderClass:
                  "px-3! py-2! text-start! text-xs! font-medium! text-gray-400! dark:text-gray-500!",
                slotLaneClass: "border-gray-100! dark:border-gray-800/60!",
                dayLaneClass: (data: DayCellArg) =>
                  `border-gray-200! dark:border-gray-800! ${
                    data.isToday
                      ? "bg-brand-50/15! dark:bg-brand-500/[0.03]!"
                      : ""
                  }`,
                allDayDividerClass:
                  "border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!",
                allDayHeaderClass:
                  "border-0! bg-gray-50! text-xs! font-medium! text-gray-500! dark:border-0! dark:bg-gray-900! dark:text-gray-400!",
              },
              timeGridDay: {
                slotDuration: "00:30:00",
                slotMinHeight: 48,
                allDaySlot: true,
                dayHeaderContent: (arg: DayHeaderArg) => {
                  const weekday = new Intl.DateTimeFormat(locale, {
                    weekday: "short",
                  })
                    .format(arg.date)
                    .toUpperCase();
                  const day = new Intl.DateTimeFormat(locale, {
                    day: "numeric",
                  }).format(arg.date);
                  return `${weekday} - ${day}`;
                },
                dayHeaderClass: (data: DayHeaderArg) =>
                  `border-0! bg-gray-50! dark:bg-gray-900! ${
                    data.isToday ? "bg-gray-100/70! dark:bg-gray-800/60!" : ""
                  }`,
                dayHeaderInnerClass: (data: DayHeaderArg) =>
                  `px-4! py-3.5! text-center! text-xs! font-medium! text-gray-500! uppercase! dark:text-gray-400! ${
                    data.isToday
                      ? "font-semibold! text-brand-500! dark:text-brand-400!"
                      : ""
                  }`,
                slotHeaderDividerClass:
                  "border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!",
                slotHeaderClass:
                  "px-3! py-2! text-start! text-xs! font-medium! text-gray-400! dark:text-gray-500!",
                slotLaneClass: "border-gray-100! dark:border-gray-800/60!",
                dayLaneClass: (data: DayCellArg) =>
                  `border-gray-200! dark:border-gray-800! ${
                    data.isToday
                      ? "bg-brand-50/15! dark:bg-brand-500/[0.03]!"
                      : ""
                  }`,
                allDayDividerClass:
                  "border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!",
                allDayHeaderClass:
                  "border-0! bg-gray-50! text-xs! font-medium! text-gray-500! dark:border-0! dark:bg-gray-900! dark:text-gray-400!",
              },
            }}
            height="auto"
            borderless={true}
            viewClass="border-t! border-b-0! border-x-0! border-gray-200! dark:border-gray-800!"
            dayHeaderDividerClass="border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!"
            slotMinHeight={56}
            slotHeaderDividerClass="border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!"
            allDayDividerClass="border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!"
            eventClass="focus:shadow-none"
            nowIndicator={false}
            columnEventClass="bg-transparent! border-0! p-1! shadow-none! hover:shadow-none! focus:outline-none"
            columnEventInnerClass="p-0! border-0! bg-transparent! h-full"
            tableHeaderSticky={true}
            tableClass="overflow-hidden"
            rowEventClass="bg-transparent! border-0! px-1! py-0.5! shadow-none! hover:shadow-none! focus:outline-none"
            rowEventInnerClass="p-0! border-0! bg-transparent!"
            popoverFormat={{ month: "short", day: "numeric", year: "numeric" }}
            popoverClass="z-99999! w-72 max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-900"
            popoverCloseClass="absolute end-3 top-2.5 flex size-7 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
            popoverCloseContent={{
              html: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M18 6L6 18M6 6l12 12" /></svg>`,
            }}
            selectable={true}
            events={events}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            datesSet={handleDatesSet}
          />
        </div>

        {toolbarEndEl &&
          createPortal(
            <CalendarViewDropdown
              currentView={currentView}
              onViewChange={handleViewChange}
            />,
            toolbarEndEl,
          )}

        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-175 p-6 lg:p-10"
        >
          <div className="flex custom-scrollbar flex-col overflow-y-auto px-2">
            <div>
              <h5 className="modal-title mb-2 text-theme-xl font-semibold text-gray-800 lg:text-2xl dark:text-white/90">
                {selectedEvent ? "Edit Event" : "Add Event"}
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Plan your next big moment: schedule or edit an event to stay on
                track
              </p>
            </div>
            <div className="mt-8">
              <div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Event Title
                  </label>
                  <input
                    id="event-title"
                    type="text"
                    value={eventTitle}
                    placeholder="Enter event title"
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Event Color
                </label>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  {Object.entries(calendarsEvents).map(([key, value]) => (
                    <div key={key} className="n-chk">
                      <div
                        className={`form-check form-check-${value} form-check-inline`}
                      >
                        <label
                          className="form-check-label flex cursor-pointer items-center text-sm text-gray-700 dark:text-gray-400"
                          htmlFor={`modal${key}`}
                        >
                          <span className="relative">
                            <input
                              className="form-check-input sr-only"
                              type="radio"
                              name="event-level"
                              value={key}
                              id={`modal${key}`}
                              checked={eventLevel === key}
                              onChange={() => setEventLevel(key)}
                            />
                            <span className="box me-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700">
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  value === "danger"
                                    ? "bg-error-500"
                                    : value === "success"
                                      ? "bg-success-500"
                                      : value === "warning"
                                        ? "bg-orange-500"
                                        : "bg-brand-500"
                                } ${eventLevel === key ? "block" : "hidden"}`}
                              />
                            </span>
                          </span>
                          {key}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Enter Start Date
                </label>
                <div className="relative">
                  <input
                    id="event-start-date"
                    type="date"
                    value={eventStartDate}
                    onChange={(e) => setEventStartDate(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 ps-4 pe-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Enter End Date
                </label>
                <div className="relative">
                  <input
                    id="event-end-date"
                    type="date"
                    value={eventEndDate}
                    onChange={(e) => setEventEndDate(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 ps-4 pe-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer mt-6 flex items-center gap-3 sm:justify-end">
              <button
                onClick={closeModal}
                type="button"
                className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3"
              >
                Close
              </button>
              <button
                onClick={handleAddOrUpdateEvent}
                type="button"
                className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
              >
                {selectedEvent ? "Update Changes" : "Add Event"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Calendar;
