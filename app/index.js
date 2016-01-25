import './css/main.scss';
import $ from 'jquery';

$(document).ready(function () {
    ColorTrans.init();
});

var ColorTrans = {
    // 初始化
    init: function () {
        this.eventInit();
    },
    // 事件绑定
    eventInit: function () {
        var that = this;
        that.hexInput = document.getElementById('hex');
        that.rgbInput = document.getElementById('rgb');

        that.hexInput.addEventListener('input', function (e) {
            e.stopPropagation();
            e.preventDefault();
            //console.log(that.hexInput.value);
            that.rgbInput.value = that.hexToRgb(that.hexInput.value);
            that.paint(that.rgbInput.value);
        }, false);

        that.rgbInput.addEventListener('input', function (e) {
            e.stopPropagation();
            e.preventDefault();
            //console.log(that.rgbInput.value);
            that.hexInput.value = that.rgbToHex(that.rgbInput.value);
            that.paint(that.hexInput.value);
        }, false);
    },
    // Hex色值匹配
    hexRegExp: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,
    // RGB色值匹配
    rgbRegExp: /^(rgb|RGB)?\(((25[0-5]|2[0-4][0-9]|1[0-9]?[0-9]|[1-9][0-9]|[0-9]),){2}(25[0-5]|2[0-4][0-9]|1[0-9]?[0-9]|[1-9][0-9]|[0-9])\)$/,
    // Hex转RGB
    hexToRgb: function (hex) {
        var that = this;
        hex = hex.toLowerCase();
        var RGB = "";
        //console.log(hex);
        if (hex && that.hexRegExp.test(hex)) {
            var hexFull = '#';
            if (hex.length === 4) {
                for (let i = 1; i < 4; i += 1) {
                    hexFull += hex.slice(i, i+1).concat(hex.slice(i, i+1));
                }
                //console.log(hexFull);
            } else
                hexFull = hex;
            var transRgb = [];
            for (let i = 1; i < 7; i += 2) {
                transRgb.push(parseInt("0x" + hexFull.slice(i, i+2)));
            }
            //console.log(transRgb);
            RGB = "RGB(" + transRgb + ")";
            return RGB;
        } else {
            return RGB;
        }
    },
    // RGB转Hex
    rgbToHex: function (rgb) {
        var that = this;
        var rgbFull;
        var hexFull = "#";
        var HEX = "";
        //console.log(that.rgbRegExp.test(rgb))
        if (that.rgbRegExp.test(rgb)) {
            rgbFull = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(',');
            //console.log(rgbFull);
            for (let i = 0; i < rgbFull.length; i++) {
                var hexTemp = Number(rgbFull[i]).toString(16);
                hexTemp = hexTemp < 10 ? "0" + hexTemp : hexTemp;
                //console.log(hexTemp);
                hexFull += hexTemp;
            }
            //console.log(hexFull);
            HEX = hexFull.toUpperCase();
            return HEX;
        } else {
            return HEX;
        }
    },
    // 着色
    paint: function (color) {
        var that = this;
        var _rgbRegExp = /^\(((25[0-5]|2[0-4][0-9]|1[0-9]?[0-9]|[1-9][0-9]|[0-9]),){2}(25[0-5]|2[0-4][0-9]|1[0-9]?[0-9]|[1-9][0-9]|[0-9])\)$/
        that.bg = document.getElementsByTagName('body')[0];
        if (_rgbRegExp.test(color)) color = "rgb" + color;
        that.bg.style.backgroundColor = color;

        if (that.colorJudge(color) === true) {
            document.getElementsByTagName('body')[0].className = 'light';
        } else {
            document.getElementsByTagName('body')[0].className = 'dark';
        }
    },
    // 色值明暗判定
    colorJudge: function (color) {
        var that = this;
        if (color && that.hexRegExp.test(color)) {
            let colorFull = '#';
            if (color.length === 4) {
                for(let i = 1; i < 4; i += 1){
                    colorFull += color.slice(i, i+1).concat(color.slice(i, i+1));
                }
                //console.log(colorFull);
            } else colorFull = color;
            let ave = (parseInt("0x"+colorFull.substr(1,2)) + parseInt("0x"+colorFull.substr(3,2)) + parseInt("0x"+colorFull.substr(5,2)))/3;
            if (ave > 128) return true;
            else return false;
        } else if (color && that.rgbRegExp.test(color)) {
            let colorFull = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(',');
            //console.log(colorFull);
            let ave = (parseInt(colorFull[0]) + parseInt(colorFull[1]) + parseInt(colorFull[2]))/3;
            //console.log(ave)
            if (ave > 128) return true;
            else return false;
        } else return true;
    }
};
