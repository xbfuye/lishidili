/* 华夏文明 - 移动端触摸支持补丁
   为底部年份滑动条添加触摸拖动支持 */
(function() {
  'use strict';

  // 检查是否为触摸设备
  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice) return;

  var scrubberTrack = null;
  var isDragging = false;

  // 获取年份范围
  function getYearRange() {
    var input = document.getElementById('inp-year');
    if (!input) return { min: -403, max: 2026 };
    return {
      min: parseInt(input.min) || -403,
      max: parseInt(input.max) || 2026
    };
  }

  // 根据位置计算年份
  function positionToYear(clientX) {
    if (!scrubberTrack) return null;
    var rect = scrubberTrack.getBoundingClientRect();
    var range = getYearRange();
    var percent = (clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    var year = Math.round(range.min + percent * (range.max - range.min));
    return year;
  }

  // 设置年份
  function setYear(year) {
    var input = document.getElementById('inp-year');
    if (!input) return;
    input.value = year;
    // 触发 input 和 change 事件
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // 初始化触摸支持
  function initTouchSupport() {
    scrubberTrack = document.getElementById('scrubber-track');
    if (!scrubberTrack) return;

    // 触摸开始
    scrubberTrack.addEventListener('touchstart', function(e) {
      if (e.touches.length !== 1) return;
      isDragging = true;
      e.preventDefault();

      var touch = e.touches[0];
      var year = positionToYear(touch.clientX);
      if (year !== null) setYear(year);
    }, { passive: false });

    // 触摸移动
    document.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      if (e.touches.length !== 1) return;
      e.preventDefault();

      var touch = e.touches[0];
      var year = positionToYear(touch.clientX);
      if (year !== null) setYear(year);
    }, { passive: false });

    // 触摸结束
    document.addEventListener('touchend', function(e) {
      isDragging = false;
    }, { passive: false });

    // 触摸取消
    document.addEventListener('touchcancel', function(e) {
      isDragging = false;
    }, { passive: false });

    // 给朝代波段也添加点击支持
    var dynastyBands = document.getElementById('dynasty-bands');
    if (dynastyBands) {
      dynastyBands.addEventListener('touchstart', function(e) {
        if (e.touches.length !== 1) return;
        var touch = e.touches[0];
        var year = positionToYear(touch.clientX);
        if (year !== null) setYear(year);
      }, { passive: true });
    }
  }

  // 给按钮添加触摸反馈
  function initButtonFeedback() {
    var buttons = document.querySelectorAll(
      '#act-autoplay, .step-nav-btn, #act-mobile-chronicle, .round-btn'
    );
    buttons.forEach(function(btn) {
      btn.addEventListener('touchstart', function() {
        btn.style.transform = 'scale(0.95)';
        btn.style.transition = 'transform 0.1s';
      }, { passive: true });
      btn.addEventListener('touchend', function() {
        btn.style.transform = '';
      }, { passive: true });
      btn.addEventListener('touchcancel', function() {
        btn.style.transform = '';
      }, { passive: true });
    });
  }

  // 页面加载后初始化
  function init() {
    initTouchSupport();
    initButtonFeedback();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 延迟再初始化一次，确保动态元素已加载
  setTimeout(init, 2000);
  setTimeout(init, 5000);
})();
