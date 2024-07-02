$(document).on('turbolinks:load', function() {
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    events: '/schedules.json',
    editable: true,
    droppable: true,
    selectable: true,
    selectHelper: true,
    select: function(start, end) {
      $('#eventForm').show();
      $('#event_start').val(start.format());
      $('#event_end').val(end.format());
    },
    eventDrop: function(event, delta, revertFunc) {
      updateEvent(event);
    },
    eventResize: function(event, delta, revertFunc) {
      updateEvent(event);
    },
    eventClick: function(event, jsEvent, view) {
      if (confirm('このイベントを削除しますか？')) {
        deleteEvent(event);
      }
    }
  });

  $('#new_event').on('submit', function(event) {
    event.preventDefault();
    var title = $('#event_title').val();
    var start = $('#event_start').val();
    var end = $('#event_end').val();

    $.ajax({
      url: '/schedules',
      method: 'POST',
      data: {
        schedule: {
          title: title,
          start_at: start,
          end_at: end
        }
      },
      success: function(data) {
        $('#calendar').fullCalendar('renderEvent', {
          id: data.id,
          title: data.title,
          start: data.start_at,
          end: data.end_at
        }, true);
        $('#eventForm').hide();
        $('#new_event')[0].reset();
      },
      error: function(data) {
        alert('予定の追加中にエラーが発生しました。');
      }
    });
  });

  function updateEvent(event) {
    $.ajax({
      url: '/schedules/' + event.id,
      method: 'PATCH',
      data: {
        schedule: {
          start_at: event.start.format(),
          end_at: event.end ? event.end.format() : null
        }
      },
      success: function() {
        $('#calendar').fullCalendar('updateEvent', event);
      },
      error: function() {
        alert('予定の更新中にエラーが発生しました。');
      }
    });
  }

  function deleteEvent(event) {
    $.ajax({
      url: '/schedules/' + event.id,
      method: 'DELETE',
      success: function() {
        $('#calendar').fullCalendar('removeEvents', event.id);
      },
      error: function() {
        alert('予定の削除中にエラーが発生しました。');
      }
    });
  }
});