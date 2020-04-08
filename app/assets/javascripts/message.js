$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image.url) {
      var html = //メッセージに画像が含まれる場合のHTMLを作る
      `<div class="ChatRoom__Info">
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
      <img class="ChatRoom__Message__Image" src=${message.image.url}>`
    } else {
      var html = 
      `<div class="ChatRoom__Info">
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
    }
    return html
  }
  function pagedown() {
    $('.Main-Chat').animate({
      'scrollBottom':'0'
    });
  };
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
  })
});


