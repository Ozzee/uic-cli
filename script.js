angular.module('smsApp', [])
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  })
  .controller('smsController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.messages = [];

    var newsHeadlines = [
      'News story 1',
      'News story 2',
      'News story 3',
      'News story 4',
      'News story 5',
      'News story 6'
    ];

    var news = [
      'News story 1 - Lorem ipsum Reprehenderit irure velit ea Excepteur et incididunt velit anim esse aliquip elit deserunt aute veniam dolore in ut dolore cupidatat.',
      'News story 2',
      'News story 3',
      'News story 4',
      'News story 5',
      'News story 6'
    ];

    var help =  'Available commands:\n'+
                'HELP - This text\n'+
                'SUB (W/D/B) - Subscribe to the service. Optional: Weekly, Daily, Breaking news\n'+
                'UNSUB - Unsubscribe from the service\n'+
                'ST X - Get more information about headline number X\n'+
                'REP Y - Report a story with headline Y\n';

    $scope.sendSMS = function() {
      var message = {text:$scope.sms, sent:true};
      $scope.messages.push(message);
      $timeout(function(){receiveSMS(message.text)}, 1000);
      $scope.sms = '';
    };

    function receiveSMS(sent){
      var text = '';

      var arr = sent.split(' ');
      var command = '';
      if (arr.length > 0){
        command = arr[0].toUpperCase();

        if (command === 'SUB'){
          if (arr.length > 1){
            text = 'Thank you for subscribing! Unsubscribe at any time with "UNSUB". ';
            var type = arr[1].toUpperCase();
            if (type === 'W'){
              text = text + 'You will get weekly updates.';
            } else if (type === 'D'){
              text = text + 'You will get daily updates.';
            } else if (type === 'B'){
              text = text + 'You will get updates as they happen.';
            }
          }
          $timeout(function(){sendHeadlines()}, 3000);
        } else if (command === 'UNSUB'){
          text = 'You have been unsubscribed. Goodbye!';
        } else if (command === 'REP'){
          text = 'Thank you for reporting a story. We will contact you shortly for more information should the story be picked up.';
        } else if (command === 'ST'){
          if (arr.length > 1){
            text = news[parseInt(arr[1])-1];
          } else {
            text = help;
          }
        } else {
          text = help;
        }
      } else {
        text = help;
      }

      $scope.messages.push({text:text, sent:false});
    }

    function sendHeadlines(){
      var text = 'Headlines:\n';
      newsHeadlines.forEach(function(h, i){text = text + (i+1) + '. '+ h + '\n'});
      $scope.messages.push({text:text, sent:false});
    }


  }]);