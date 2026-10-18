import React from 'react';
import { Printer, CheckCircle2, Lightbulb, Bookmark } from 'lucide-react';

export const CheatSheet: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Banner with Print CTA */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Spickzettel A1 (Phao cứu sinh thi cử)</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Bảng tổng kết nhanh để ôn thi A1 (Goethe / Telc)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Toàn bộ quy tắc cốt lõi, công thức cấu trúc câu và bảng tra cứu mạo từ trên một trang duy nhất.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>In tài liệu ôn tập</span>
        </button>
      </div>

      {/* Cheatsheet Core Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="bg-slate-900 text-white p-4">
          <h3 className="text-sm font-bold tracking-wide uppercase">
            8. Bảng ghi nhớ vàng ôn thi A1 cấp tốc
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-1/4">Chủ đề</th>
                <th className="py-3 px-4 w-3/4">Điều cốt tử cần nhớ &amp; Ví dụ thi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Giống danh từ</td>
                <td className="py-3 px-4">
                  <strong>r = der</strong> (giống đực), <strong>e = die</strong> (giống cái), <strong>s = das</strong> (giống trung).
                  Luôn học từ mới theo cụm: <em>Mạo từ + Danh từ + Dạng số nhiều</em>.
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Số nhiều</td>
                <td className="py-3 px-4">
                  Ở số nhiều, mạo từ xác định <strong>luôn luôn là die</strong> bất kể giống ban đầu.
                  Các đuôi chính: <code>-e</code> (Tische), <code>-er</code> (Kinder), <code>-(e)n</code> (Frauen), <code>-s</code> (Autos), <code>không đổi</code> (Lehrer), <code>biến âm</code> (Äpfel).
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Câu khẳng định</td>
                <td className="py-3 px-4">
                  Động từ đã chia <strong>luôn ở vị trí 2</strong>: <em>Ich lerne (2) heute Deutsch.</em>
                  Nếu trạng từ lên đầu (Inversion): <em>Heute lerne (2) ich (3) Deutsch.</em>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Câu hỏi Ja/Nein</td>
                <td className="py-3 px-4">
                  Động từ <strong>đứng ở vị trí đầu câu</strong>: <em>Lernst du Deutsch? — Ja, ich lerne Deutsch.</em>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Câu hỏi W</td>
                <td className="py-3 px-4">
                  Từ hỏi + Động từ (2) + Chủ ngữ: <em>Wo wohnst du? / Wie heißt du? / Was machst du?</em>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Phủ định</td>
                <td className="py-3 px-4">
                  <strong>kein</strong> dùng cho danh từ có <em>ein</em> hoặc không mạo từ: <em>Ich habe kein Auto.</em>
                  <strong>nicht</strong> dùng cho động từ, tính từ và trạng từ: <em>Das ist nicht teuer. / Ich komme nicht.</em>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Nominativ (Nom)</td>
                <td className="py-3 px-4">
                  Chủ ngữ trong câu: <em>Der Mann arbeitet. (der, die, das, die)</em>.
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Akkusativ (Akk)</td>
                <td className="py-3 px-4">
                  Tân ngữ trực tiếp. <strong>CHỈ GIỐNG ĐỰC ĐỔI: der → den</strong> (hoặc ein → einen, kein → keinen).
                  <em>Ich sehe den Mann / eine Frau / ein Kind.</em>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Dativ (Dat)</td>
                <td className="py-3 px-4">
                  Người nhận hoặc sau động từ/giới từ Dativ: <strong>dem</strong> (đực/trung), <strong>der</strong> (cái), <strong>den + -n</strong> (số nhiều).
                  <em>Ich helfe dem Mann / der Frau / den Kindern.</em>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Genitiv (Gen)</td>
                <td className="py-3 px-4">
                  Chỉ sự sở hữu: <em>Das Auto des Mannes / der Frau.</em>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Modalverb</td>
                <td className="py-3 px-4">
                  Động từ khuyết thiếu chia ở V2, động từ chính nguyên mẫu <strong>ở cuối câu</strong>:
                  <em>Ich kann gut schwimmen. / Wir müssen heute lernen.</em>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Động từ tách</td>
                <td className="py-3 px-4">
                  Tiền tố tách bị đẩy về tận cuối câu chính: <em>Ich stehe um 6 Uhr <strong>auf</strong>.</em>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Weil &amp; Dass</td>
                <td className="py-3 px-4">
                  Động từ đã chia <strong>về cuối mệnh đề phụ</strong>:
                  <em>Ich bleibe zu Hause, weil ich krank <strong>bin</strong>.</em>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Quá khứ Perfekt</td>
                <td className="py-3 px-4">
                  haben / sein chia ở V2 + Partizip II ở cuối câu:
                  <em>Ich habe Deutsch gelernt. / Er ist nach Berlin gefahren (chuyển động → sein).</em>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Learning Path */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-blue-700" />
          <h3 className="font-bold text-sm text-blue-900">
            Lộ trình học tập đề xuất đạt A1 vững chắc:
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-xs">
            <span className="font-bold text-blue-700 block mb-1">Giai đoạn 1</span>
            <p className="text-slate-700 font-medium">Danh từ, giống (der/die/das) &amp; Dạng số nhiều.</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-xs">
            <span className="font-bold text-blue-700 block mb-1">Giai đoạn 2</span>
            <p className="text-slate-700 font-medium">Chia động từ hiện tại Präsens &amp; Trật tự câu V2.</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-xs">
            <span className="font-bold text-blue-700 block mb-1">Giai đoạn 3</span>
            <p className="text-slate-700 font-medium">Nominativ &amp; Akkusativ → Dativ &amp; Giới từ.</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-xs">
            <span className="font-bold text-blue-700 block mb-1">Giai đoạn 4</span>
            <p className="text-slate-700 font-medium">Modalverb, Động từ tách, Quá khứ Perfekt &amp; Câu ghép.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
