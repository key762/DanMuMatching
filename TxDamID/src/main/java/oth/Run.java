package oth;

import cn.hutool.json.JSONUtil;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.*;

public class Run {
    public static void main(String[] args) throws IOException {

        Map<Integer,String> res = new HashMap<>();

        String cid = "";

        Document doc = Jsoup.connect("https://v.qq.com/x/cover/mzc002002kqssyu/q4100dpkd26.html")
                .header("pragma", "no-cache")
                .header("Accept", "*/*")
                .header("Host", "v.qq.com")
                .header("Accept-Encoding", "gzip, deflate, br")
                .timeout(10000)
                .get();

        Elements allElements = doc.getElementsByClass("playlist-rect__container");
        Elements elements = allElements.get(0).getElementsByAttribute("data-vid");
        for (Element element : elements) {
            String key = element.attributes().get("data-vid");
            cid = element.attributes().get("data-cid");
            Integer index = Integer.valueOf(element.getElementsByClass("playlist-item-rect__title").get(0).text());
            Elements ts = element.getElementsByClass("b-imgtag2 b-imgtag2--right-top b-imgtag2--small");
            if (ts.size() > 0) {
                String mark = ts.get(0).text();
                if (!mark.equals("预")){
                    res.put(index, key);
                }
            }else {
                res.put(index, key);
            }
        }

        res.put(0,"");
        Map<Integer, String> sortedMap = new TreeMap<>(res);
        List<String> valueList = new ArrayList<>(sortedMap.values());

        Map<String , Object> info = new HashMap<>();

        info.put("mod", "https://v.qq.com/x/cover/${cid}/${id}.html");
        info.put("cid", cid);
        info.put("ids", valueList);

        System.out.println(JSONUtil.toJsonStr(info));

    }
}
