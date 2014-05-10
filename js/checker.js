// jQuery objects
//
var startButton = $('.hw4-start-button'), // 「開始掃描」按鈕
    results = $('.hw4-result'); // 「掃描結果」 table

// 垃圾社團列表
var junkGroups = [];

// 用 Ajax 自 http://spamgroup.tonyq.org/groups/jsonp 取得垃圾社團列表

$.getJSON("http://jsbin.com/jaziroja/1", {}, function(data){
  // 將每筆資料的 GID 放進 junkGroups 陣列中。
  data.forEach(function(record){
    junkGroups.push(record.GID);
  });
  startButton.removeAttr('disabled').removeClass('disabled');
});

// 設定 Facebook AppID
window.fbAsyncInit = function(){
  FB.init({
    appId: '1432032383716667', // 若可以，請換成自己的 App ID !
    status: true
  });

  
  startButton.click(function(){
    results.empty(); 
    $('.hw4-complete').remove(); 
       FB.login(function(){
						 console.log('Logged in!');
						 
       FB.api('/me/groups', function(resp){
        var i;
        for(i=0; i<resp.data.length; i+=1){
          if( junkGroups.indexOf( resp.data[i].id ) !== -1 ){
            results.append('<tr><td>'+group.id+'</td><td>'+group.name+'</td></tr>');
          }
        }
        results.after('<div class="hw4-complete alert alert-info">掃描完成</div>');
      });
    }, {scope: 'user_groups'});
	    // 比對每個使用者的 group 是否有在 junkGroups 中出現
		
    // 1. 讓使用者登入此 Facebook App (FB.login)
    // 2. 以 FB.api 拿到使用者的 group 列表
    // 拿到使用者 group 列表的 response 之後：
    // results.after('<div class="hw4-complete alert alert-info">掃描完成</div>');
  });
};




 
