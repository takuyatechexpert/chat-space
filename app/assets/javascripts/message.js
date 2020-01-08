$(function(){

  function buildHtml(message){
    if ( message.image ) {
      var html =
        `<div class="main__chat__message"　data-message-id=${message.id}>
          <div class="chat__user">
            ${message.user_name}
            <div class="chat__date">
              ${message.created_at}
            </div>
          </div>
          <div class="user__message">
            <p class="lower-message__content">
              ${message.content}
            </p>
            <img src=${message.image}>
          </div>
        </div>`
        return html;
    } else {
        var html =
          `<div class="main__chat__message"　data-message-id=${message.id}>
            <div class="chat__user">
              ${message.user_name}
              <div class="chat__date">
                ${message.created_at}
              </div>
            </div>
            <div class="user__message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
          return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHtml(data);
      $('.main__chat').append(html);
      $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit__btn').prop('disabled', false)
  
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
      $('.submit__btn').prop('disabled', false)
    })
  })
});