$(function(){

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.ChatRoom__Info:last').data("message-id");
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
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.ChatRoom').append(insertHTML);
        $('.ChatRoom').animate({ scrollTop: $('.ChatRoom')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
 

  function buildHTML(message){
    if (message.image) {
      var html = 
      `<div class="ChatRoom__Info" data-message-id=${message.id}>
        <div class="ChatRoom__Info__UserName">
        ${message.user_name}
        </div>
        <div class="ChatRoom__Info__Timestamp">
        ${message.created_at}
        </div>
      </div>
      <p class="ChatRoom__Message">
      ${message.body}
      </p>
      <img class="ChatRoom__Message__Image" src=${message.image}>`
      return html;
    } else {
      var html = 
      `<div class="ChatRoom__Info" data-message-id=${message.id}>
        <div class="ChatRoom__Info__UserName">
        ${message.user_name}
        </div>
        <div class="ChatRoom__Info__Timestamp">
        ${message.created_at}
        </div>
      </div>
      <p class="ChatRoom__Message">
      ${message.body}
      </p>`
      return html;
    };
    
  }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    $('.form__submit').removeAttr('data-disable-with');
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
      var html = buildHTML(data);
      $('.ChatRoom').append(html);
      $('form')[0].reset();
      $('.ChatRoom').animate({ scrollTop: $('.ChatRoom')[0].scrollHeight});      
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
  
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }

});

