import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Calendar, CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS } from './event-utils';
import { DoctorService } from 'src/app/services/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAppointmentsComponent } from './add-appointments/add-appointments.component';
import { PatientService } from 'src/app/services/patient.service';
import * as moment from 'moment';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';



@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
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
    initialView: 'dayGridMonth',
    events:[],
    eventColor:'#FF0000',
    // initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    // dayCellContent: this.handleDayCellContent.bind(this),
    // eventContent: this.handleEventContent.bind(this),

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef, private patientService: PatientService, private dialog: MatDialog) {
  }
  ngOnInit() {
    this.fetchPatientsAppointments();
  }
  fetchPatientsAppointments(){
    this.patientService.getAllAppointments().subscribe(
      appointments =>{
        console.log(appointments);
        const events = appointments.map(appointment =>({
          id: appointment._id,
          date: appointment.date, // You can customize the event title
          doctor: appointment.doctorId,
          time: appointment.timeAppointment,
        }));
        console.log('appointments :',events);
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

  openDialog(){
    const dialogRef = this.dialog.open(AddAppointmentsComponent);

    dialogRef.afterClosed().subscribe(result => {
      // Handle any result from the dialog if needed
      console.log('Dialog closed with result:', result);
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const dialogRef = this.dialog.open(AddAppointmentsComponent);

    dialogRef.afterClosed().subscribe(result => {
      // Handle any result from the dialog if needed
      console.log('Dialog closed with result:', result);
    });    // const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();
    }

  handleEventClick(clickInfo: EventClickArg) {
    const dialogRef = this.dialog.open(ViewAppointmentComponent,{
      data: {id: clickInfo.event.id},
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any result from the dialog if needed
      console.log('Dialog closed with result:', result);
    });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

}
