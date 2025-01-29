class Event {
    constructor(start_time, end_time, description) {
        this.start_time = start_time;
        this.end_time = end_time;
        this.description = description;
    }
}

class EventManager {
    constructor() {
        this.events = [];
    }

    addEvent(start_time, end_time, description) {
        const newEvent = new Event(start_time, end_time, description);
        const conflicts = this.findConflicts(newEvent);

        if (conflicts.length > 0) {
            return conflicts;
        } else {
            this.events.push(newEvent);
            return 'Event added successfully!';
        }
    }

    findConflicts(newEvent) {
        const conflicts = [];
        for (const event of this.events) {
            if (newEvent.start_time < event.end_time && newEvent.end_time > event.start_time) {
                conflicts.push(event);
            }
        }
        return conflicts;
    }
}

const eventForm = document.getElementById('eventForm');
const eventList = document.getElementById('eventList');
const conflictList = document.getElementById('conflictList');
const eventManager = new EventManager();

eventForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const description = document.getElementById('description').value;

    const result = eventManager.addEvent(startTime, endTime, description);

    if (typeof result === 'string') {
        const eventItem = document.createElement('li');
        eventItem.textContent = `${startTime} - ${endTime}: ${description}`;
        eventList.appendChild(eventItem);
        alert(result);
    } else {
        conflictList.innerHTML = '';
        for (const conflict of result) {
            const conflictItem = document.createElement('li');
            conflictItem.textContent = `${conflict.start_time} - ${conflict.end_time}: ${conflict.description}`;
            conflictList.appendChild(conflictItem);
        }
        alert('Conflict detected! See conflicts section.');
    }

    eventForm.reset();
});