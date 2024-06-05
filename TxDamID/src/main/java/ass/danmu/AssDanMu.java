package ass.danmu;

import cn.hutool.core.util.CharsetUtil;
import cn.hutool.extra.emoji.EmojiUtil;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.vdurmont.emoji.EmojiParser;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DurationFormatUtils;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

public class AssDanMu {

    public static Integer speed = 6;

    public static Integer size = 63;

    public static void main(String[] args) {
        Map<Long, List<TxDanMu>> allRes = new HashMap<>();
        List<String> baseUrl = getBaseUrl("https://dm.video.qq.com/barrage/base/u4100vc3n8u");
        for (String u : baseUrl) {
            getExtraDanMu(allRes, "https://dm.video.qq.com/barrage/segment/u4100vc3n8u/" + u);
        }
        printDanMu(allRes);
    }

    private static void printDanMu(Map<Long, List<TxDanMu>> res) {
        for (Long key : res.keySet()) {
            List<TxDanMu> value = res.get(key);
            if (value.size() > 3) {
                List<TxDanMu> topThree = value.stream()
                        .sorted(Comparator.comparing(TxDanMu::getScore).reversed())
                        .limit(3)
                        .collect(Collectors.toList());
                res.put(key, topThree);
            }
        }
        Map<Long, List<TxDanMu>> sortedRes = new TreeMap<>(res);
        DanMuBar danMuBar1 = new DanMuBar("{\\move(1920,100,END_MARK,100)\\fs" + size + "}");
        DanMuBar danMuBar2 = new DanMuBar("{\\move(1920,200,END_MARK,200)\\fs" + size + "}");
        DanMuBar danMuBar3 = new DanMuBar("{\\move(1920,300,END_MARK,300)\\fs" + size + "}");
        DanMuBar danMuBar4 = new DanMuBar("{\\move(1920,400,END_MARK,400)\\fs" + size + "}");
        for (Map.Entry<Long, List<TxDanMu>> entry : sortedRes.entrySet()) {
            for (TxDanMu txDanMu : entry.getValue()) {
                String strD = "Dialogue: 3," + txDanMu.getDanMuTime() + "," + txDanMu.getEndDanMuTime() + ",Default-Box,atg1,0,0,0,,";
                if (danMuBar1.mark) {
                    danMuBar1.nTime = txDanMu.gkTime();
                    danMuBar1.mark = false;
                    System.out.println(strD + danMuBar1.pos.replace("END_MARK", txDanMu.getOutPix()) + txDanMu.getStyle() + txDanMu.getContent());
                } else if (danMuBar2.mark) {
                    danMuBar2.nTime = txDanMu.gkTime();
                    danMuBar2.mark = false;
                    System.out.println(strD + danMuBar2.pos.replace("END_MARK", txDanMu.getOutPix()) + txDanMu.getStyle() + txDanMu.getContent());
                } else if (danMuBar3.mark) {
                    danMuBar3.nTime = txDanMu.gkTime();
                    danMuBar3.mark = false;
                    System.out.println(strD + danMuBar3.pos.replace("END_MARK", txDanMu.getOutPix()) + txDanMu.getStyle() + txDanMu.getContent());
                } else if (danMuBar4.mark) {
                    danMuBar4.nTime = txDanMu.gkTime();
                    danMuBar4.mark = false;
                    System.out.println(strD + danMuBar4.pos.replace("END_MARK", txDanMu.getOutPix()) + txDanMu.getStyle() + txDanMu.getContent());
                }
            }
            danMuBar1.next();
            danMuBar2.next();
            danMuBar3.next();
            danMuBar4.next();
        }
    }

    private static void getExtraDanMu(Map<Long, List<TxDanMu>> all, String url) {
        Map<Long, List<TxDanMu>> res = new HashMap<>();
        String result = HttpUtil.get(url, CharsetUtil.CHARSET_UTF_8);
        JSONArray jsonArray = JSONUtil.parseArray(JSONUtil.parse(result).getByPath("barrage_list").toString());
        for (Object object : jsonArray) {
            JSONObject data = JSONUtil.parseObj(object.toString());
            String content = data.getStr("content");
            content = EmojiParser.removeAllEmojis(content);
            if (!content.isEmpty()) {
                Long offset = data.getLong("time_offset");
                String style = data.getStr("content_style");
                BigDecimal score = data.getBigDecimal("content_score");
                Date time = new Date(data.getLong("create_time") * 1000);
                TxDanMu txDanMu = new TxDanMu();
                txDanMu.setOffset(offset);
                txDanMu.setContent(content);
                txDanMu.setStyle(style);
                txDanMu.setScore(score);
                txDanMu.setTime(time);
                if (res.containsKey(offset)) {
                    res.get(offset).add(txDanMu);
                } else {
                    List<TxDanMu> list = new ArrayList<>();
                    list.add(txDanMu);
                    res.put(offset, list);
                }
            }
        }
        all.putAll(res);
    }

    private static List<String> getBaseUrl(String url) {
        List<String> list = new ArrayList<>();
        String result = HttpUtil.get(url, CharsetUtil.CHARSET_UTF_8);
        JSONObject jsonObject = JSONUtil.parseObj(JSONUtil.parse(result).getByPath("segment_index"));
        for (String key : jsonObject.keySet()) {
            JSONObject segmentObject = jsonObject.getJSONObject(key);
            String segmentName = segmentObject.getStr("segment_name");
            list.add(segmentName);
        }
        return list;
    }

    static class TxDanMu {
        private Long offset;
        private Long end;
        private Date time;
        private String content;
        private String style;
        private BigDecimal score;

        public Long getOffset() {
            return offset;
        }

        public void setOffset(Long offset) {
            this.offset = offset;
        }

        public Long getEnd() {
            return end;
        }

        public void setEnd(Long end) {
            this.end = end;
        }

        public Date getTime() {
            return time;
        }

        public void setTime(Date time) {
            this.time = time;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        public String getStyle() {
            if (!this.style.isEmpty()) {
                if (this.style.contains("gradient_colors")) {
                    JSONArray jsonArray = JSONUtil.parseArray(JSONUtil.parse(this.style).getByPath("gradient_colors").toString());
                    // 整体时间
//                    double textLength = this.content.length() * (size * 0.7);
//                    long textTime = (long) ((textLength + 1920.0) * speed);
//                    long endTime = (long) ((1920.0 * textTime) / textLength);
                    long endTime = (long) (1920.0 * speed);
                    String c1 = "0000FF";
                    String c2 = "00FF00";
                    try {
                        c1 = StringUtils.reverse(jsonArray.get(0).toString());
                        c2 = StringUtils.reverse(jsonArray.get(1).toString());
                    } catch (Exception ignore) {
                    }
                    return "{\\c&H" + c1 + "&\\t(0," + (endTime) + ",\\c&H" + c2 + "&)}";
                }
            }
            return style;
        }

        public void setStyle(String style) {
            this.style = style;
        }

        public BigDecimal getScore() {
            return score;
        }

        public void setScore(BigDecimal score) {
            this.score = score;
        }

        public String getDanMuTime() {
            return getDanMuTime(0L);
        }

        public double gkTime() {
            return (double) (((this.content.length() * size) * 7) / 1000) + 0.1;
        }

        public String getEndDanMuTime() {
//            double textLength = this.content.length() * (size * 0.7);
//            long textTime = (long) ((textLength + 1920.0) * speed);
            long textTime = (long) ((1920.0 + 1920.0) * speed);
            return getDanMuTime(textTime);
        }

        public String getOutPix() {
            return "-1920";
//            return "-" + Math.round((this.content.length() * (size * 0.7)) * 10) / 10.0;
        }

        public String getDanMuTime(Long end) {
            return DurationFormatUtils.formatDuration(this.offset + end, "HH:mm:ss.SS");
        }

        @Override
        public String toString() {
            return "TxDanMu{" +
                    "offset=" + offset +
                    ", end=" + end +
                    ", time=" + time +
                    ", content='" + content + '\'' +
                    ", style='" + style + '\'' +
                    ", score=" + score +
                    '}';
        }

    }

    static class DanMuBar {
        public String pos;
        public Boolean mark;
        public double nTime;

        public DanMuBar(String pos) {
            this.pos = pos;
            this.mark = true;
        }

        public void next() {
            if (this.nTime <= 0) {
                this.mark = true;
            } else {
                this.nTime -= 1;
                if (this.nTime <= 0) {
                    this.mark = true;
                }
            }
        }

    }

}
