$(function(){

  function buildHtml(message){
        if (message.content && message.image) {
          //data-idが反映されるようにしている
          var html =
          `<div class="main__chat__message" data-message-id= "${message.id}" >` +
            `<div class="chat__user">` +
              message.user_name +
              `<div class="chat__date">` +
                message.created_at +
              `</div>` +
            `</div>` +
            `<div class="user__message">` +
              `<p class="lower-message__content">` +
                message.content +
              `</p>` +
              `<img src=  ${message.image} class = "lower-message__content">` +
            `</div>` +
          `</div>`
        } else if (message.content) {
          //同様に、data-idが反映されるようにしている
          var html =
            `<div class="main__chat__message" data-message-id= "${message.id}" >` +
              `<div class="chat__user">` +
                message.user_name +
                `<div class="chat__date">` +
                  message.created_at +
                `</div>` +
              `</div>` +
              `<div class="user__message">` +
                `<p class="lower-message__content">` +
                  message.content +
                `</p>` +
              `</div>` +
            `</div>`
        } else if ( message.image ) {
          var html =
            `<div class="main__chat__message" data-message-id= "${message.id}" >` +
              `<div class="chat__user">` +
                message.user_name +
                `<div class="chat__date">` +
                  message.created_at +
                `</div>` +
              `</div>` +
              `<div class="user__message">` +
                `<p class="lower-message__content">` +
                  message.content +
                `</p>` +
                `<img src= ${message.image} class = "lower-message__content">` +
              `</div>` +
            `</div>`
        };
            return html;
    };
    
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
    })

    .always(function(){
      $('.submit__btn').prop('disabled', false)
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  });

    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.main__chat__message:last').data("message-id");
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
            //追加するHTMLの入れ物を作る
          var insertHTML = '';
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function(i, message) {
            insertHTML += buildHtml(message)
          });
          //メッセージが入ったHTMLに、入れ物ごと追加
          $('.main__chat').append(insertHTML);
          $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
});