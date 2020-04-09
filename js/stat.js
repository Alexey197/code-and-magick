'use strict';

var cloudParams = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  GAP: 10
};

var textParams = {
  HEIGHT: 20,
  GAP: 10
};

var titleParams = {
  X: 20,
  Y: 30
};

var barParams = {
  WIDTH: 40,
  HEIGHT: cloudParams.HEIGHT - textParams.GAP - textParams.HEIGHT - textParams.GAP - cloudParams.Y - titleParams.Y - textParams.HEIGHT - textParams.HEIGHT,
  GAP: 50
};

var MAX_WIDTH = 200;
var LINE_HEIGHT = 20;
var MARGIN_LEFT = titleParams.X + cloudParams.X;
var MARGIN_TOP = titleParams.Y + cloudParams.Y;
var TEXT = 'Ура вы победили! Список результатов:';

var wrapText = function (ctx, text, marginLeft, marginTop, maxWidth, lineHeight) {
  var words = text.split(' ');
  var countWords = words.length;
  var line = '';
  for (var n = 0; n < countWords; n++) {
    var testLine = line + words[n] + ' ';
    var testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth) {
      ctx.fillText(line, marginLeft, marginTop);
      line = words[n] + ' ';
      marginTop += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, marginLeft, marginTop);
};

var renderColorHsl = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var saturation = Math.floor(Math.random() * (max - min + 1)) + min;
  return 'hsl(240,' + saturation + '%, 50%';
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudParams.WIDTH, cloudParams.HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = Math.max.apply(null, arr);
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, cloudParams.X + cloudParams.GAP, cloudParams.Y + cloudParams.GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, cloudParams.X, cloudParams.Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';

  wrapText(ctx, TEXT, MARGIN_LEFT, MARGIN_TOP, MAX_WIDTH, LINE_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], cloudParams.X + barParams.GAP + (barParams.WIDTH + barParams.GAP) * i, cloudParams.HEIGHT + cloudParams.Y - textParams.GAP);
    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : renderColorHsl(0, 100);
    ctx.fillRect(cloudParams.X + barParams.GAP + (barParams.WIDTH + barParams.GAP) * i, cloudParams.HEIGHT + cloudParams.Y - textParams.GAP - textParams.HEIGHT, barParams.WIDTH, (-barParams.HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), cloudParams.X + barParams.GAP + (barParams.WIDTH + barParams.GAP) * i, cloudParams.HEIGHT + cloudParams.Y - textParams.GAP - textParams.HEIGHT - (barParams.HEIGHT * times[i]) / maxTime - textParams.GAP);
  }
};


