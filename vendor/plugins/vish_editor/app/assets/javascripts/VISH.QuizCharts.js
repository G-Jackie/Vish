var VISH = VISH || {};
VISH.Constant = VISH.Constant || {};
VISH.Constant.QZ_TYPE = VISH.Constant.QZ_TYPE || {};
VISH.Constant.QZ_TYPE.OPEN = "open";
VISH.Constant.QZ_TYPE.MCHOICE = "multiplechoice";
VISH.Constant.QZ_TYPE.TF = "truefalse";


VISH.QuizCharts = (function(V,$,undefined){
  
  var choicesLetters = ['a)','b)','c)','d)','e)','f)','g)','h)','i)','j)','k)','l)','m)','n)','o)','p)','q)','r)','s)'];
  var pieBackgroundColor = ["#F38630","#E0E4CC","#69D2E7","#FFF82A","#FF0FB4","#2A31FF","#FF6075","#00D043"];
  var pieLetterColor = ["#000","#000","#000","#000","#000","#000","#000","#000"];
  var choices = {};

  var init = function(){
  };

  var drawQuizChart = function(canvas,quizType,nAnswers,answersList,options){
    switch (quizType) {
      case V.Constant.QZ_TYPE.OPEN:
         break;
      case V.Constant.QZ_TYPE.MCHOICE:
        _drawMcChoiceQuizChart(canvas,nAnswers,answersList,options);
        break;
      case V.Constant.QZ_TYPE.TF:
        _drawTFQuizChart(canvas,nAnswers,answersList,options);
        break;
      default:
        return null; 
        break;
    }
  }

  var _drawMcChoiceQuizChart = function(canvas,nAnswers,answersList,options){
    var pieFragments = [];
    var data = [];

    for(var i=0; i<nAnswers; i++){
      pieFragments[i] = {};
      pieFragments[i].value = 0;
      pieFragments[i].label = choicesLetters[i];
      pieFragments[i].color = pieBackgroundColor[i];
      pieFragments[i].labelColor = pieLetterColor[i];
      pieFragments[i].labelFontSize = '16';
    }

    var alL = answersList.length;
    for(var j=0; j<alL; j++){
      //List of answers of a user
      var answers = answersList[j];

      var aL = answers.length;
      for(var k=0; k<aL; k++){
        var answer = answers[k];
        var index = answer.no-1;
        if(answer.answer==="true"){
          pieFragments[index].value++;
        }
      } 
    }

    for(var i=0; i<nAnswers; i++){
      data.push(pieFragments[i]);
    }


    var ctx = $(canvas).get(0).getContext("2d");
    
    var animation = false;
    if((options)&&(options.first===true)){
      animation = true;
    }

    var options = {
        showTooltips: false,
        animation: animation
    }

    var myNewChart = new Chart(ctx).Pie(data,options);
  }


  var _drawTFQuizChart = function(canvas,nAnswers,answersList,options){
    var labels = [];
    var dataTrue = [];
    var dataFalse = [];
    var maxValue = 0;
    var scaleSteps = 10;

    for(var i=0; i<nAnswers; i++){
      labels[i] = "V       " + choicesLetters[i] + "       F";
      dataTrue[i] = 0;
      dataFalse[i] = 0;
    }

    var alL = answersList.length;
    for(var j=0; j<alL; j++){
      //List of answers of a user
      var answers = answersList[j];

      var aL = answers.length;
      for(var k=0; k<aL; k++){
        var answer = answers[k];
        var index = answer.no-1;
        if(answer.answer==="true"){
          dataTrue[index]++;
        } else {
          dataFalse[index]++;
        }
      } 
    }

    for(var l=0; l<nAnswers; l++){
      if(dataTrue[l] > maxValue){
        maxValue = dataTrue[l];
      }
      if(dataFalse[l] > maxValue){
        maxValue = dataFalse[l];
      }
    }

    if(maxValue<10){
      scaleSteps = Math.max(1,maxValue);
    }

    var ctx = $(canvas).get(0).getContext("2d");
    var data = {
        labels : labels,
        datasets : [
            {
                fillColor : "#E2FFE3",
                strokeColor : "rgba(220,220,220,1)",
                data : dataTrue
            },
            {
                fillColor : "#FFE2E2",
                strokeColor : "rgba(220,220,220,1)",
                data : dataFalse
            }
        ]
    };

    var animation = false;
    if((options)&&(options.first===true)){
      animation = true;
    }

    var options = {
      animation: animation,
      scaleOverride: true,
      scaleStepWidth: Math.max(1,Math.ceil(maxValue/10)),
      scaleSteps: scaleSteps,
      showTooltips: false
    }
    var myNewChart = new Chart(ctx).Bar(data,options);
  }


  return {
    init                : init,
    drawQuizChart       : drawQuizChart
  };
    
}) (VISH, jQuery);

 