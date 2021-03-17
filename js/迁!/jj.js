var m_sTool = {
        strColor: "rgba(0,0,0,1)",
        iLineWidth: 3,
        bDraw: !1,
        iLastMouseX: 0,
        iLastMouseY: 0,
        iStopMouseX: 0,
        iStopMouseY: 0,
        iStartTimer: 0
    },
    m_iLoopMsec = 25,
    m_elmCv, m_ctxCv, m_rectCv, m_aasLine = [],
    m_aasBezier = [],
    m_aasPeni = [],
    m_aiTempo = [0],
    m_iLastTimer, m_aiPatternTempo = [],
    m_iPatternTempoMin, m_iPatternTempoCnt, m_iTempoStartSec, m_strAnni = "",
    m_aiShiruKoma = [],
    m_aasShiru = [],
    m_iFrameCnt = 100,
    m_iFrameIdx = 0;
$(function () {
    for (var a = location.hostname, b = 0, f = 0; f < a.length; f++) b += a.charCodeAt(f);
    if (805 == b) {
        b = new Date;
        a = b.getMonth() + 1;
        b = b.getDate();
        switch ("" + a + "/" + b) {
            case "12/24":
            case "12/25":
                m_strAnni = "xmas"
        }
        m_elmCv = document.getElementById("elmCv");
        m_ctxCv = m_elmCv.getContext("2d");
        m_rectCv = m_elmCv.getBoundingClientRect();
        m_elmCv.width = $(window).width();
        m_elmCv.height = .8 * $(window).height();
        m_elmCv.addEventListener("mouseup", fnTouch, !0);
        m_elmCv.addEventListener("mousedown", fnTouch, !0);
        m_elmCv.addEventListener("mousemove",
            fnTouch, !0);
        m_elmCv.addEventListener("touchstart", fnTouch, !0);
        m_elmCv.addEventListener("touchend", fnTouch, !0);
        m_elmCv.addEventListener("touchmove", fnTouch, !0);
        m_ctxCv.strokeStyle = m_sTool.strColor;
        m_ctxCv.lineWidth = m_sTool.iLineWidth;
        m_ctxCv.lineJoin = "round";
        m_ctxCv.lineCap = "round";
        m_aasPeni = fnConvSvg2ShapeArray(["M 5.3015862,316.06351 L 6.8790705,315.94405 L 8.276245,315.61491 L 9.4064476,314.99875 L 10.183016,314.01821 L 10.519287,312.59595 L 10.411068,311.36658 L 9.9935461,310.19443 L 9.3225443,309.12052 L 8.4538862,308.18589 L 7.4433954,307.43158 L 6.3468952,306.89862 L 5.2202092,306.62805 L 4.1191607,306.66095 L 4.1446877,305.52033 L 4.1977897,304.41962 L 4.2706667,303.33369 L 4.3555197,302.23738 L 4.4445467,301.10556 L 4.5299477,299.91307 L 4.6039227,298.63477 L 4.6586717,297.24551 L 4.3166654,294.7536 L 3.2783257,292.9901 L 1.7762259,291.94679 L 0.04293936,291.61546 L -1.6889605,291.98788 L -3.1869003,293.05585 L -4.2183067,294.81113 L -4.5506063,297.24551 L -4.4939143,298.67591 L -4.4272033,300.01792 L -4.3539473,301.27952 L -4.2776213,302.46871 L -4.2016983,303.5935 L -4.1296533,304.66187 L -4.0649603,305.68184 L -4.0110943,306.66139 L -5.1925955,306.63759 L -6.3793674,306.86162 L -7.5142675,307.31893 L -8.5401533,307.99497 L -9.3998822,308.87522 L -10.036312,309.94515 L -10.3923,311.19021 L -10.4107,312.59588 L -9.9444273,314.08651 L -9.0195717,315.09065 L -7.7417655,315.69801 L -6.2166415,315.9983 L -4.5498321,316.0812",
            "M 5.3269686,316.06351 C 13.640782,315.94706 11.09505,307.35519 4.1445431,306.66095 C 4.0683921,302.22488 6.9379602,291.61546 0.068321837,291.61546 C -6.8013166,291.61546 -4.2324029,302.04252 -3.9857119,306.66139 C -11.585308,306.95811 -13.689786,315.52737 -4.5244497,316.0812"
        ]);
        m_aasPeni = fnAdjustShapeScale(m_aasPeni);
        m_aasPeni = fnConvShapeXY2ShapeRA(m_aasPeni);
        window.addEventListener("devicemotion", fnDevicemotion);
        fnLoop()
    }
});
var m_iShake = {
    iLocX: 0,
    iLocY: 0,
    iVecX: 0,
    iVecY: 0,
    iStartTimer: 0
};

function fnShakeWindow(a, b) {
    if (m_iShake.iLocX != a || m_iShake.iLocY != b) {
        var f = m_iShake.iVecX,
            d = m_iShake.iVecY;
        a > m_iShake.iLocX && (f = 1);
        a < m_iShake.iLocX && (f = -1);
        b > m_iShake.iLocY && (d = 1);
        b < m_iShake.iLocY && (d = -1);
        if (m_iShake.iVecX != f || m_iShake.iVecY != d) {
            if (500 > (new Date).getTime() - m_iShake.iStartTimer)
                for (var c = 0, e = m_aasLine.length; c < e; c++) 2 <= m_aasLine[c].iMorphPer && (m_aasBezier[c].iPuruPerMax += .1 * Math.random(), m_aasBezier[c].iPuruPerMax = Math.min(1, m_aasBezier[c].iPuruPerMax), m_aasBezier[c].iPuruPerVec +=
                    .05 * Math.random() * (0 <= m_aasBezier[c].iPuruPerVec ? 1 : -1), m_aasBezier[c].iPuruPerVec = Math.min(1, m_aasBezier[c].iPuruPerVec), m_aasBezier[c].iPuruPerVec = Math.max(-1, m_aasBezier[c].iPuruPerVec), m_aiShiruKoma[c] += 100, m_aiShiruKoma[c] = Math.min(m_aiShiruKoma[c], 1E4));
            m_iShake.iStartTimer = (new Date).getTime();
            fnEndTempo()
        }
        m_iShake.iLocX = a;
        m_iShake.iLocY = b;
        m_iShake.iVecX = f;
        m_iShake.iVecY = d
    }
}

function fnDevicemotion(a) {
    var b = a.acceleration.x;
    a = a.acceleration.y;
    (5 < b || -5 > b || 5 < a || -5 > a) && fnShakeWindow(b, a)
}

function fnTouch(a) {
    a.preventDefault();
    if (1 == "ontouchend" in document) {
        var b = Math.floor(a.touches[0].clientX);
        var f = Math.floor(a.touches[0].clientY)
    } else b = a.clientX, f = a.clientY;
    f -= m_rectCv.top;
    switch (a.type) {
        case "mousedown":
        case "touchstart":
            m_sTool.iStartTimer = (new Date).getTime();
            fnDrawEnd(-.5);
            fnDrawStart(b, f);
            fnSetTempo();
            b = fnGetPatternTempo();
            if (0 < b.length) {
                m_aiPatternTempo = b;
                m_iPatternTempoCnt = 0;
                m_iPatternTempoMin = m_aiPatternTempo[0];
                for (b = 0; b < m_aiPatternTempo.length; b++) m_iPatternTempoCnt +=
                    m_aiPatternTempo[b], m_iPatternTempoMin = Math.min(m_aiPatternTempo[b], m_iPatternTempoMin);
                m_iTempoStartSec = (new Date).getTime();
                m_iTempoStartSec -= 250
            }
            break;
        case "mouseup":
        case "touchend":
            fnDrawEnd(-.5);
            break;
        case "mousemove":
        case "touchmove":
            0 != m_sTool.bDraw && (m_sTool.iStartTimer = (new Date).getTime(), 10 > Math.sqrt(Math.pow(m_sTool.iLastMouseX - b, 2) + Math.pow(m_sTool.iLastMouseY - f, 2)) || (m_sTool.iLastMouseX = b, m_sTool.iLastMouseY = f, a = m_aasLine.length - 1, m_aasLine[a][m_aasLine[a].length] = {
                iX: b,
                iY: f
            }, fnClearTempo()))
    }
}

function fnDrawStart(a, b) {
    1 != m_sTool.bDraw && (m_sTool.bDraw = !0, m_sTool.iLastMouseX = a, m_sTool.iLastMouseY = b, m_aasLine[m_aasLine.length] = [])
}

function fnDrawEnd(a) {
    if (0 != m_sTool.bDraw) {
        m_sTool.bDraw = !1;
        var b = m_aasLine.length - 1;
        if (2 > m_aasLine[b].length) m_aasLine.pop();
        else {
            var f = fnGetXYRA(m_aasLine[b]),
                d = [];
            for (iIdx = 0; iIdx < m_aasPeni.length; iIdx++) d[iIdx] = fnConvShapeRA2LineXY(m_aasPeni[iIdx], f.iX, f.iY, f.iR, f.iA + Math.PI / 180 * 90);
            if (m_aasLine[b].length > d[0].length) {
                var c = m_aasLine[b].length;
                d[0] = fnAdjustShapePointCount(d[0], c)
            } else m_aasLine[b].length < d[0].length && (c = d[0].length, m_aasLine[b] = fnAdjustShapePointCount(m_aasLine[b], c));
            fnIsReverse(m_aasLine[b],
                d[0]) && (d[0] = fnReverseShape(d[0]));
            c = 0;
            for (var e = m_aasLine[b].length; c < e; c++) m_aasLine[b][c].iOldX = m_aasLine[b][c].iX, m_aasLine[b][c].iOldY = m_aasLine[b][c].iY, m_aasLine[b][c].iNewX = d[0][c].iX, m_aasLine[b][c].iNewY = d[0][c].iY;
            m_aasBezier[b] = d[1];
            m_aasBezier[b].iPuruPerIdx = 0;
            m_aasBezier[b].iPuruPerMax = 0;
            m_aasBezier[b].iPuruPerVec = 0;
            m_aasBezier[b].iPuruCenterPer = 2 * Math.random();
            m_aasBezier[b].iPuruPuruSt = Math.floor(4 * Math.random()) + 2;
            m_aiShiruKoma[b] = 0;
            m_aasShiru[b] = [];
            m_aasShiru[b].aiX = [];
            m_aasShiru[b].aiY = [];
            c = 0;
            for (d = m_aasBezier[b].length; c < d; c++) m_aasShiru[b].aiX[c] = m_aasBezier[b][c].iX, m_aasShiru[b].aiY[c] = m_aasBezier[b][c].iY;
            m_aasShiru[b].iR = f.iR;
            m_aasLine[b].iMorphPer = a
        }
    }
}

function fnLoop() {
    if ((new Date).getTime() >= m_iTempoStartSec)
        for (var a = ((new Date).getTime() - m_iTempoStartSec) % m_iPatternTempoCnt, b = 0, f = -1, d = 0; d < m_aiPatternTempo.length; d++) {
            if (a >= b && a < b + m_aiPatternTempo[d]) {
                f = (a - b) / m_iPatternTempoMin;
                f = Math.min(1, f);
                break
            }
            b += m_aiPatternTempo[d]
        }
    fnShakeWindow(Math.floor((window.screenX || window.screenLeft || 0) / 10), Math.floor((window.screenY || window.screenTop || 0) / 10));
    m_sTool.bDraw && m_sTool.iStopMouseX == m_sTool.iLastMouseX && m_sTool.iStopMouseY == m_sTool.iLastMouseY && 3E3 <
        (new Date).getTime() - m_sTool.iStartTimer && (fnDrawEnd(0), fnDrawStart(m_sTool.iLastMouseX, m_sTool.iLastMouseY));
    m_sTool.iStopMouseX = m_sTool.iLastMouseX;
    m_sTool.iStopMouseY = m_sTool.iLastMouseY;
    a = 0;
    for (b = m_aasLine.length; a < b; a++) 2 <= m_aasLine[a].length && 2 >= m_aasLine[a].iMorphPer && (m_aasLine[a].iMorphPer += m_iLoopMsec / 25 * .01);
    m_ctxCv.clearRect(0, 0, m_elmCv.width, m_elmCv.height);
    a = 0;
    for (b = m_aasLine.length; a < b; a++) {
        d = m_aasLine[a].iMorphPer;
        if (0 <= d && 1 >= d) {
            var c = d;
            c = Math.max(0, c);
            c = Math.min(1, c);
            c = (Math.cos((1 -
                c) * Math.PI) + 1) / 2;
            m_aasLine[a] = fnMorph(m_aasLine[a], "iX", "iOldX", "iNewX", c);
            m_aasLine[a] = fnMorph(m_aasLine[a], "iY", "iOldY", "iNewY", c)
        }
        1 <= d && 2 >= d && (c = 2 - d, c = Math.max(0, c), c = Math.min(1, c), m_ctxCv.globalAlpha = c);
        (!d || 2 >= d) && fnDrawLine(m_ctxCv, m_aasLine[a]);
        1 <= d && 2 >= d && (c = d - 1, c = Math.max(0, c), c = Math.min(1, c), m_ctxCv.globalAlpha = c);
        if (1 <= d) {
            for (var e = [], g = 0; g < m_aasBezier[a].length; g++) e[g] = [], e[g].iX = m_aasBezier[a][g].iX, e[g].iY = m_aasBezier[a][g].iY;
            if (2 <= d && 0 <= f) {
                var h = (e[0].iX + e[12].iX) / 2,
                    k = (e[0].iY + e[12].iY) /
                    2;
                c = f;
                c += (c + 0 * a) % 1;
                c = fnConvRhythmPer(c, a);
                for (g = 3; 9 >= g; g++) e[g].iX += .2 * (h - e[g].iX) * -c, e[g].iY += .2 * (k - e[g].iY) * -c;
                0 == m_aasBezier[a].iPuruPerMax && (m_aasBezier[a].iPuruPerMax = .5 * Math.random(), m_aasBezier[a].iPuruPerVec = .02 * Math.random());
                m_aasBezier[a].iPuruPerIdx += m_aasBezier[a].iPuruPerVec;
                if (0 > m_aasBezier[a].iPuruPerVec && m_aasBezier[a].iPuruPerIdx < 0 - m_aasBezier[a].iPuruPerMax || 0 < m_aasBezier[a].iPuruPerVec && m_aasBezier[a].iPuruPerIdx > m_aasBezier[a].iPuruPerMax) m_aasBezier[a].iPuruPerVec *= -1
            } else if (0 !=
                m_aasBezier[a].iPuruPerMax) {
                m_aasBezier[a].iPuruPerIdx += m_aasBezier[a].iPuruPerVec;
                if (0 > m_aasBezier[a].iPuruPerVec && m_aasBezier[a].iPuruPerIdx < 0 - m_aasBezier[a].iPuruPerMax || 0 < m_aasBezier[a].iPuruPerVec && m_aasBezier[a].iPuruPerIdx > m_aasBezier[a].iPuruPerMax) m_aasBezier[a].iPuruPerMax *= .95, m_aasBezier[a].iPuruPerVec *= -.95; - .01 < m_aasBezier[a].iPuruPerMax && .01 > m_aasBezier[a].iPuruPerMax && (m_aasBezier[a].iPuruPerIdx = 0, m_aasBezier[a].iPuruPerMax = 0)
            }
            if (0 != m_aasBezier[a].iPuruPerIdx) {
                h = (e[0].iX + e[12].iX) /
                    2;
                c = (e[0].iY + e[12].iY) / 2;
                g = (e[3].iY + e[9].iY) / 2;
                h += ((e[3].iX + e[9].iX) / 2 - h) * m_aasBezier[a].iPuruCenterPer;
                k = c + (g - c) * m_aasBezier[a].iPuruCenterPer;
                c = m_aasBezier[a].iPuruPerIdx;
                var l = 12 - m_aasBezier[a].iPuruPuruSt;
                for (g = m_aasBezier[a].iPuruPuruSt; g <= l; g++) e[g] = fnRotate(h, k, e[g].iX, e[g].iY, 40 * c)
            }
            fnDrawBezier(m_ctxCv, e)
        }
        1 <= d && 2 >= d && (m_ctxCv.globalAlpha = 1)
    }
    if (!f || 0 > f) {
        m_ctxCv.lineWidth = m_sTool.iLineWidth;
        b = m_aasBezier.length;
        b = Math.min(b, 10);
        for (a = 0; a < b; a++) d = m_aasLine[a].iMorphPer, 1 <= d && 0 >= m_aasBezier[a].iPuruPerMax &&
            (f = m_aasShiru[a].aiX.length - 1, clsEffect.sbDrawDew(m_ctxCv, 1, m_aasShiru[a], 0, "", 0, "#aaaaaa", .8, 1E3 < m_aiShiruKoma[a], 1, 2, 0, f / 2, f, .7 * m_aasShiru[a].iR, .3 * m_aasShiru[a].iR, 2 * m_aasShiru[a].iR, 10, "", m_iFrameCnt, m_iFrameIdx, "peni" + a, !1, 1, 0, !0, !0), 0 < m_aiShiruKoma[a] && --m_aiShiruKoma[a]);
        m_ctxCv.globalAlpha = 1
    }
    setTimeout(fnLoop, m_iLoopMsec)
}

function fnConvRhythmPer(a, b) {
    var f = .3 * b % .7 + .3;
    return a < f ? 1 - a / f : 0
}

function fnClearTempo() {
    m_aiTempo = [0]
}

function fnEndTempo() {
    m_aiTempo = [0];
    m_aiPatternTempo = []
}

function fnSetTempo() {
    var a = (new Date).getTime();
    if (m_iLastTimer) {
        var b = a - m_iLastTimer;
        1E4 < b && fnClearTempo();
        m_aiTempo[m_aiTempo.length] = b;
        30 < m_aiTempo.length && m_aiTempo.shift()
    }
    m_iLastTimer = a
}

function fnGetPatternTempo() {
    for (var a = [], b = Math.floor((m_aiTempo.length - 0) / 2); 1 <= b; b--) {
        var f = 1 >= b ? 4 : 2 >= b ? 3 : 2,
            d = [];
        if (m_aiTempo.length >= b * f - 1) {
            for (var c = !0, e = m_aiTempo.length - 1; e > m_aiTempo.length - b * f; e--)
                if (d[e] = m_aiTempo[e], e <= m_aiTempo.length - b - 1) {
                    var g = d[e] >= d[e + b] - 200 && d[e] <= d[e + b] + 200;
                    c = c && g;
                    if (0 == g) break
                } if (c) {
                a = [];
                for (e = m_aiTempo.length - b; e < m_aiTempo.length; e++) a[a.length] = m_aiTempo[e];
                break
            }
        }
    }
    return a
}

function fnGetXYRA(a) {
    for (var b = 0, f = 0, d = 0, c = a.length; d < c; d++) b += a[d].iX, f += a[d].iY;
    b /= a.length;
    f /= a.length;
    var e = 0;
    d = 0;
    for (c = a.length; d < c; d++) e += Math.sqrt(Math.pow(a[d].iX - b, 2) + Math.pow(a[d].iY - f, 2));
    return {
        iX: b,
        iY: f,
        iR: e / a.length,
        iA: Math.atan2(f - (a[0].iY + (a[a.length - 1].iY - a[0].iY) / 2), b - (a[0].iX + (a[a.length - 1].iX - a[0].iX) / 2))
    }
}

function fnDrawLine(a, b) {
    if (2 <= b.length) {
        a.beginPath();
        for (var f = 0, d = b.length; f < d; f++) {
            var c = b[f].iX,
                e = b[f].iY;
            0 == f ? a.moveTo(c, e) : a.lineTo(c, e)
        }
        a.stroke()
    }
}

function fnDrawBezier(a, b) {
    if (2 <= b.length) {
        a.beginPath();
        a.moveTo(b[0].iX, b[0].iY);
        for (var f = 1; f < b.length; f += 3) a.bezierCurveTo(b[f + 0].iX, b[f + 0].iY, b[f + 1].iX, b[f + 1].iY, b[f + 2].iX, b[f + 2].iY);
        a.stroke()
    }
}

function fnConvSvg2ShapeArray(a) {
    var b = [];
    for (iShapeIdx = 0; iShapeIdx < a.length; iShapeIdx++) {
        b[iShapeIdx] = [];
        strShape = a[iShapeIdx];
        for (var f = strShape.split(" "), d, c, e = 0, g = 0, h = f.length; g < h; g++) c = f[g].split(","), 2 == c.length && (d = Number(c[0]), c = Number(c[1]), b[iShapeIdx][e] = {
            iX: d,
            iY: c
        }, e++)
    }
    return b
}

function fnConvSvg2ShapeArray2(a) {
    a = a.split(" ");
    for (var b = [], f = 0, d = 0, c = 0, e = 0, g = a.length; e < g; e++) {
        var h = a[e].split(",");
        2 == h.length && (f += Number(h[0]), d += Number(h[1]), b[c] = {
            iX: f,
            iY: d
        }, c++)
    }
    return b
}

function fnAdjustShapeScale(a) {
    var b = 0,
        f = 0,
        d = 0,
        c = 0;
    for (iShapeIdx = 0; iShapeIdx < a.length; iShapeIdx++)
        for (var e = 0, g = a[iShapeIdx].length; e < g; e++) {
            var h = a[iShapeIdx][e].iX,
                k = a[iShapeIdx][e].iY;
            0 == e ? (b = h, f = k, d = h, c = k) : (b = Math.min(h, b), f = Math.min(k, f), d = Math.max(h, d), c = Math.max(k, c))
        }
    d -= b;
    c -= f;
    h = 2 / Math.max(d, c);
    for (iShapeIdx = 0; iShapeIdx < a.length; iShapeIdx++)
        for (e = 0, g = a[iShapeIdx].length; e < g; e++) a[iShapeIdx][e].iX += 0 - b - .5 * d, a[iShapeIdx][e].iY += 0 - f - .5 * c, a[iShapeIdx][e].iX *= h, a[iShapeIdx][e].iY *= h;
    return a
}

function fnConvShapeXY2ShapeRA(a) {
    for (iShapeIdx = 0; iShapeIdx < a.length; iShapeIdx++)
        for (var b = 0, f = a[iShapeIdx].length; b < f; b++) a[iShapeIdx][b].iA = Math.atan2(a[iShapeIdx][b].iY, a[iShapeIdx][b].iX), a[iShapeIdx][b].iR = Math.sqrt(Math.pow(a[iShapeIdx][b].iX, 2) + Math.pow(a[iShapeIdx][b].iY, 2));
    return a
}

function fnConvShapeRA2LineXY(a, b, f, d, c) {
    for (var e = [], g = 0, h = a.length; g < h; g++) {
        var k = Math.cos(a[g].iA + c) * a[g].iR,
            l = Math.sin(a[g].iA + c) * a[g].iR;
        k = b + k * d;
        l = f + l * d;
        e[g] = {
            iX: k,
            iY: l
        }
    }
    return e
}

function fnAdjustShapePointCount(a, b) {
    var f = 0;
    for (iOldIdx = 0; iOldIdx < a.length - 1; iOldIdx++) {
        var d = Math.sqrt(Math.pow(a[iOldIdx + 1].iX - a[iOldIdx].iX, 2) + Math.pow(a[iOldIdx + 1].iY - a[iOldIdx].iY, 2));
        f += d
    }
    var c = f / (b - 1),
        e = [],
        g = 0;
    for (iOldIdx = f = 0; iOldIdx < a.length - 1; iOldIdx++) {
        d = Math.sqrt(Math.pow(a[iOldIdx + 1].iX - a[iOldIdx].iX, 2) + Math.pow(a[iOldIdx + 1].iY - a[iOldIdx].iY, 2));
        f += d;
        for (iIdx = g; iIdx * c < f; iIdx++) {
            var h = (iIdx - g) * c / d;
            e[iIdx] = {
                iX: a[iOldIdx].iX + (a[iOldIdx + 1].iX - a[iOldIdx].iX) * h,
                iY: a[iOldIdx].iY + (a[iOldIdx +
                    1].iY - a[iOldIdx].iY) * h
            }
        }
        g = iIdx
    }
    e[b - 1] = {
        iX: a[a.length - 1].iX,
        iY: a[a.length - 1].iY
    };
    return e
}

function fnIsReverse(a, b) {
    var f = a[0].iX,
        d = a[0].iY,
        c = a[a.length - 1].iX,
        e = a[a.length - 1].iY,
        g = b[0].iX,
        h = b[0].iY,
        k = b[b.length - 1].iX,
        l = b[b.length - 1].iY;
    return Math.sqrt(Math.pow(f - g, 2) + Math.pow(d - h, 2)) + Math.sqrt(Math.pow(c - k, 2) + Math.pow(e - l, 2)) > Math.sqrt(Math.pow(f - k, 2) + Math.pow(d - l, 2)) + Math.sqrt(Math.pow(c - g, 2) + Math.pow(e - h, 2))
}

function fnReverseShape(a) {
    for (var b = [], f = a.length, d = 0, c = a.length; d < c; d++) {
        var e = f - d - 1;
        b[d] = [];
        b[d].iX = a[e].iX;
        b[d].iY = a[e].iY
    }
    return b
}

function fnMorph(a, b, f, d, c) {
    for (var e = 0, g = a.length; e < g; e++) a[e][b] = a[e][f] + (a[e][d] - a[e][f]) * c;
    return a
}

function fnRotate(a, b, f, d, c) {
    if (0 != c % 360) {
        var e = Math.sqrt(Math.pow(f - a, 2) + Math.pow(d - b, 2));
        d = Math.atan2(d - b, f - a) / (Math.PI / 180);
        d += c;
        f = a + Math.cos(d / 180 * Math.PI) * e;
        d = b + Math.sin(d / 180 * Math.PI) * e
    }
    return {
        iX: f,
        iY: d
    }
};


var clsEffect = clsEffect || {};
clsEffect = {
    bDewInit: !1,
    abDewInit: null,
    aiDewLastTrigger: null,
    aiDewUniq: null,
    aiDewLengthSt: null,
    aiDewLengthCt: null,
    aiDewLengthEd: null,
    aaiDewMd: null,
    aaiDewWt: null,
    aaiDewWp: null,
    aaiDewHt: null,
    aaiDewSp: null,
    aaiDewSt: null,
    aaiDewLf: null,
    End: null,
    sbDrawDew: function (c, x, t, n, p, g, v, q, h, b, u, l, d, w, m, y, r, z, e, k, f, a, F, G, H, I, J) {
        m *= x;
        y *= x;
        r *= x;
        clsEffect.bDewInit || (clsEffect.bDewInit = !0, clsEffect.abDewInit = [], clsEffect.aiDewLastTrigger = [], clsEffect.aiDewUniq = [], clsEffect.aiDewLengthSt = [], clsEffect.aiDewLengthCt = [],
            clsEffect.aiDewLengthEd = [], clsEffect.aaiDewMd = [], clsEffect.aaiDewWt = [], clsEffect.aaiDewWp = [], clsEffect.aaiDewHt = [], clsEffect.aaiDewSp = [], clsEffect.aaiDewSt = [], clsEffect.aaiDewLf = []);
        clsEffect.abDewInit[a] || (l = clsMorph.fnGetBezierLength(t, G, [l, d, w]), clsEffect.abDewInit[a] = !0, clsEffect.aiDewLastTrigger[a] = -1, clsEffect.aiDewUniq[a] = 0, clsEffect.aiDewLengthSt[a] = l[0], clsEffect.aiDewLengthCt[a] = l[1], clsEffect.aiDewLengthEd[a] = l[2], clsEffect.aaiDewMd[a] = [], clsEffect.aaiDewWt[a] = [], clsEffect.aaiDewWp[a] = [], clsEffect.aaiDewHt[a] = [], clsEffect.aaiDewSp[a] = [], clsEffect.aaiDewSt[a] = [], clsEffect.aaiDewLf[a] = []);
        if (h) {
            h = Math.floor(f / (k / b));
            if (1 == b && 0 == f || h != clsEffect.aiDewLastTrigger[a]) {
                f = clsEffect.aaiDewSt[a].length;
                for (b = 0; b < f; b++) 0 == clsEffect.aaiDewMd[a][b] && (f = b);
                f < u && (clsEffect.aaiDewMd[a][f] = 1, clsEffect.aaiDewWt[a][f] = ((clsEffect.aiDewUniq[a] + 4) % 5 + 6) / 10 * m, clsEffect.aaiDewWp[a][f] = 1, clsEffect.aaiDewHt[a][f] = ((clsEffect.aiDewUniq[a] + 1) % 4 + 7) / 10 * y, clsEffect.aaiDewSp[a][f] = ((clsEffect.aiDewUniq[a] + 3) %
                    7 + 4) / 10 * r, clsEffect.aaiDewSt[a][f] = clsEffect.aiDewLengthCt[a] - (clsEffect.aiDewUniq[a] + 1) % 3 / 2 * clsEffect.aaiDewWt[a][f], clsEffect.aaiDewLf[a][f] = z * k, clsEffect.aiDewUniq[a]++)
            }
            clsEffect.aiDewLastTrigger[a] = h
        }
        b = 0;
        for (u = clsEffect.aaiDewSt[a].length; b < u; b++)
            if (1 == clsEffect.aaiDewMd[a][b] || 2 == clsEffect.aaiDewMd[a][b]) {
                2 == clsEffect.aaiDewMd[a][b] && (clsEffect.aaiDewWp[a][b] -= 1 / k);
                m = clsMorph.fnTrimBezierOnly(t, G, clsEffect.aaiDewSt[a][b] + clsEffect.aaiDewWt[a][b] * (1 - clsEffect.aaiDewWp[a][b]) / 2, clsEffect.aaiDewWt[a][b] *
                    clsEffect.aaiDewWp[a][b]);
                f = m.aiX.length - 1;
                y = m.aiX[0];
                r = m.aiY[0];
                h = m.aiX[f];
                d = m.aiY[f];
                f = (Math.atan2(d - r, h - y) / (Math.PI / 180) + 360) % 360;
                f = clsEffect.aaiDewSp[a][b] * (90 > f ? (f - 0) / 90 : 180 > f ? (180 - f) / 90 : 270 > f ? (f - 180) / 90 : (360 - f) / 90) / k * (r < d ? 1 : -1);
                w = f += clsEffect.aaiDewSp[a][b] * H / k;
                var A = m.aiX[Math.floor((m.aiX.length - 1) / 2)],
                    B = m.aiY[Math.floor((m.aiX.length - 1) / 2)];
                if (1 == clsEffect.aaiDewMd[a][b]) {
                    l = A;
                    var E = B;
                    e = Math.atan2(B - r, A - y) / (Math.PI / 180);
                    e += F ? 270 : 90;
                    var C = y + Math.cos(e / 180 * Math.PI) * clsEffect.aaiDewHt[a][b],
                        D = r + Math.sin(e / 180 * Math.PI) * clsEffect.aaiDewHt[a][b];
                    e = -(w - 1) / 2;
                    e = 0 > e ? 0 : 1 < e ? 1 : e;
                    clsEffect.aaiDewLf[a][b] < k && (e *= clsEffect.aaiDewLf[a][b] / k);
                    l += (C - l) * e;
                    E += (D - E) * e;
                    D = A;
                    C = B;
                    e = Math.atan2(B - d, A - h) / (Math.PI / 180);
                    e += F ? 90 : 270;
                    h += Math.cos(e / 180 * Math.PI) * clsEffect.aaiDewHt[a][b];
                    d += Math.sin(e / 180 * Math.PI) * clsEffect.aaiDewHt[a][b];
                    e = (w + 1) / 2;
                    e = 0 > e ? 0 : 1 < e ? 1 : e;
                    clsEffect.aaiDewLf[a][b] < k && (e *= clsEffect.aaiDewLf[a][b] / k);
                    h = D + (h - D) * e;
                    e = C + (d - C) * e;
                    c.beginPath();
                    d = 0;
                    for (w = m.aiX.length; d < w; d++) 0 == d ? c.moveTo(m.aiX[d], m.aiY[d]) :
                        c.lineTo(m.aiX[d], m.aiY[d]);
                    c.bezierCurveTo(h, e, l, E, y, r)
                } else {
                    r = r > d ? r : d;
                    l = clsEffect.aaiDewWt[a][b] * clsEffect.aaiDewHt[a][b] / 3 / (clsEffect.aaiDewWt[a][b] * clsEffect.aaiDewWp[a][b]);
                    c.beginPath();
                    d = 0;
                    for (w = m.aiX.length; d < w; d++) 0 == d ? c.moveTo(m.aiX[d], m.aiY[d]) : c.lineTo(m.aiX[d], m.aiY[d]);
                    c.bezierCurveTo(h, r + l, y, r + l, y, r);
                    0 >= clsEffect.aaiDewWp[a][b] && (clsEffect.aaiDewMd[a][b] = 0)
                }
                "" != p && 0 < g && 0 < n && (c.lineWidth = n * x, c.strokeStyle = p, c.globalAlpha = clsEffect.aaiDewLf[a][b] > (z - 1) * k ? (z * k - clsEffect.aaiDewLf[a][b]) /
                    k * g : clsEffect.aaiDewLf[a][b] < k ? clsEffect.aaiDewLf[a][b] / k * g : g, c.stroke());
                "" != v && 0 < q && (c.fillStyle = v, c.globalAlpha = clsEffect.aaiDewLf[a][b] > (z - 1) * k ? (z * k - clsEffect.aaiDewLf[a][b]) / k * q : clsEffect.aaiDewLf[a][b] < k ? clsEffect.aaiDewLf[a][b] / k * g : q, c.fill());
                1 == clsEffect.aaiDewMd[a][b] && (clsEffect.aaiDewSt[a][b] += f, clsEffect.aaiDewSt[a][b] < clsEffect.aiDewLengthSt[a] ? I ? (clsEffect.aaiDewMd[a][b] = 2, clsEffect.aaiDewWp[a][b] = .5) : clsEffect.aaiDewSt[a][b] = clsEffect.aiDewLengthSt[a] : clsEffect.aaiDewSt[a][b] > clsEffect.aiDewLengthEd[a] -
                    clsEffect.aaiDewWt[a][b] && (J ? (clsEffect.aaiDewMd[a][b] = 2, clsEffect.aaiDewWp[a][b] = .5) : clsEffect.aaiDewSt[a][b] = clsEffect.aiDewLengthEd[a] - clsEffect.aaiDewWt[a][b]));
                clsEffect.aaiDewLf[a][b]--;
                0 > clsEffect.aaiDewLf[a][b] && (clsEffect.aaiDewMd[a][b] = 0)
            }
    }
};
var clsMorph = clsMorph || {};
clsMorph.fnGetBezierLength = function (c, x, t) {
    for (var n = [], p = t.length, g = 0; g < p; g++) n[g] = 0;
    var v = 0,
        q = c.aiX[0],
        h = c.aiY[0];
    for (g = 0; g < p; g++) 0 == t[g] && (n[g] = v);
    for (var b = 1, u = c.aiX.length; b < u; b += 3) {
        g = clsMorph.fnTrimBezier(q, h, c.aiX[b], c.aiY[b], c.aiX[b + 1], c.aiY[b + 1], c.aiX[b + 2], c.aiY[b + 2], x, 0 - v, 1E17);
        v += g.iLength;
        for (g = 0; g < p; g++) t[g] == b - 1 + 3 && (n[g] = v);
        q = c.aiX[b + 2];
        h = c.aiY[b + 2]
    }
    return n
};
clsMorph.fnTrimBezierOnly = function (c, x, t, n) {
    for (var p = 0, g = [], v = [], q = 0, h = c.aiX[0], b = c.aiY[0], u = 1, l = c.aiX.length; u < l; u += 3) {
        h = clsMorph.fnTrimBezier(h, b, c.aiX[u], c.aiY[u], c.aiX[u + 1], c.aiY[u + 1], c.aiX[u + 2], c.aiY[u + 2], x, t - p, n);
        b = 0;
        for (var d = h.aiX.length; b < d; b++) g[q] = h.aiX[b], v[q] = h.aiY[b], q++;
        p += h.iLength;
        if (p > t + n) break;
        h = c.aiX[u + 2];
        b = c.aiY[u + 2]
    }
    1 > g.length && (p > t + n ? (g[q] = c.aiX[c.aiX.length - 1], v[q] = c.aiY[c.aiX.length - 1]) : (g[q] = c.aiX[0], v[q] = c.aiY[0]));
    return {
        aiX: g,
        aiY: v
    }
};
clsMorph.fnTrimBezier = function (c, x, t, n, p, g, v, q, h, b, u) {
    var l = c > t ? c - t : t - c,
        d = x > n ? x - n : n - x;
    var w = 0 + (l > d ? l : d);
    l = t > p ? t - p : p - t;
    d = n > g ? n - g : g - n;
    w += l > d ? l : d;
    l = p > v ? p - v : v - p;
    d = g > q ? g - q : q - g;
    w = parseInt((w + (l > d ? l : d)) / h);
    w = 4 > w ? 4 : w;
    h = [];
    l = [];
    for (var m = d = 0, y = 0, r = 0, z = 0; z < w; z++) {
        var e = z / (w - 1),
            k = 0,
            f = 0;
        var a = (1 - e) * (1 - e) * (1 - e);
        k += a * c;
        f += a * x;
        a = 3 * e * (1 - e) * (1 - e);
        k += a * t;
        f += a * n;
        a = 3 * e * e * (1 - e);
        k += a * p;
        f += a * g;
        a = e * e * e;
        k += a * v;
        f += a * q;
        r >= b && (h[y] = k, l[y] = f, y++);
        0 < z && (r += Math.sqrt(Math.pow(d - k, 2) + Math.pow(m - f, 2)));
        if (r > b + u) break;
        d = k;
        m = f
    }
    return {
        aiX: h,
        aiY: l,
        iLength: r
    }
};