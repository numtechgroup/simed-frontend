import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDisponibilityComponent } from './add-disponibility/add-disponibility.component';
import { DoctorService } from 'src/app/services/doctor.service';
import { Disponibility } from 'src/app/models/disponibility';
import Swal from 'sweetalert2';
import dayGridPlugin from '@fullcalendar/daygrid';
import { map } from 'rxjs';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS } from '../../patients/appointments/event-utils';
import { DeleteDisponibilityComponent } from './delete-disponibility/delete-disponibility.component';
@Component({
  selector: 'app-disponibilities',
  templateUrl: './disponibilities.component.html',
  styleUrls: ['./disponibilities.component.scss']
})
export class DisponibilitiesComponent implements OnInit {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'timeGridWeek',
    // initialEvents: INITIAL_EVENTS,
    events: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventBackgroundColor: '#ff0000',
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef, private doctorService: DoctorService, private dialog: MatDialog) {
  }
  ngOnInit() {
    this.fetchDoctorAvailabilities();
  }

  fetchDoctorAvailabilities(){
    this.doctorService.getAllDisponibilities().subscribe(
      availabilities =>{
        console.log(availabilities);
        const events = availabilities.map(availability =>({
          id: availability._id,
          title: availability.titre, // You can customize the event title
          start: availability.start,
          end: availability.end
        }));
        console.log('events :',events);
        this.calendarOptions.mutate(options => {
          options.events = events;
        });
      });
  }
  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const dialogRef = this.dialog.open(AddDisponibilityComponent, {
      data: { startDateTime: selectInfo.startStr, endDateTime: selectInfo.endStr },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

      // calendarApi.addEvent(
      //   {
      //   id: createEventId(),
      //   start: selectInfo.startStr,
      //   end: selectInfo.endStr,
      // });
    }

  handleEventClick(clickInfo: EventClickArg) {
    const dialogRef = this.dialog.open(DeleteDisponibilityComponent, {
      data: { title: clickInfo.event.title },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // L'utilisateur a confirmé la suppression
        this.deleteEvent(clickInfo.event.id);
      }
    });
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }
  deleteEvent(id) {
    this.doctorService.deleteSingleEvent(id).subscribe((data: any) => {});

  }
}
