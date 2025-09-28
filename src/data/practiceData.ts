export interface PracticeTopic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  content: string;
  features: string[];
  examples: string[];
  statistics: {
    label: string;
    value: string;
    description: string;
  }[];
  image: string;
  color: string;
}

export const practiceTopics: PracticeTopic[] = [
  {
    id: "modern-society",
    title: "Xã hội hiện đại",
    subtitle: "Cách mạng khoa học - công nghệ",
    icon: "🌍",
    gradient: "from-blue-500 via-purple-500 to-pink-500",
    color: "#3B82F6",
    content: "Xã hội hiện đại bị chi phối bởi đặc điểm của thời đại: cuộc cách mạng khoa học – công nghệ hiện đại, nền kinh tế tri thức ở các nước phát triển.",
    features: ["Cách mạng khoa học", "Công nghệ hiện đại", "Kinh tế tri thức"],
    examples: ["Các nước phát triển", "Thung lũng Silicon", "Nền kinh tế số"],
    statistics: [
      { label: "GDP toàn cầu", value: "85%", description: "Từ các nước phát triển" },
      { label: "Đầu tư R&D", value: "2.5%", description: "GDP trung bình" },
      { label: "Lao động tri thức", value: "60%", description: "Lực lượng lao động" }
    ],
    image: "/pracitcal/pmc.png"
  },
  {
    id: "ai-revolution",
    title: "Trí tuệ nhân tạo",
    subtitle: "AI thay đổi cách làm việc",
    icon: "🤖",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    color: "#8B5CF6",
    content: "Trí tuệ nhân tạo (AI) đang thay đổi cách con người làm việc và học tập. Ví dụ: ChatGPT, Google DeepMind hay các ứng dụng AI trong y tế, giáo dục, và tài chính.",
    features: ["ChatGPT", "Google DeepMind", "AI trong y tế"],
    examples: ["Chẩn đoán bệnh", "Dạy học thông minh", "Phân tích dữ liệu"],
    statistics: [
      { label: "Tăng trưởng AI", value: "37%", description: "Năm 2024" },
      { label: "Ứng dụng y tế", value: "85%", description: "Độ chính xác" },
      { label: "Tự động hóa", value: "40%", description: "Công việc" }
    ],
    image: "/pracitcal/asean.png"
  },
  {
    id: "smart-cities",
    title: "Thành phố thông minh",
    subtitle: "5G và IoT",
    icon: "🏙️",
    gradient: "from-green-500 via-teal-500 to-cyan-500",
    color: "#10B981",
    content: "Công nghệ 5G và Internet vạn vật (IoT) thúc đẩy quá trình số hóa, giúp các thành phố trở thành \"Smart City\" như Singapore, Seoul hay Dubai.",
    features: ["5G Technology", "Internet of Things", "Smart City"],
    examples: ["Singapore", "Seoul", "Dubai"],
    statistics: [
      { label: "Kết nối IoT", value: "50B", description: "Thiết bị toàn cầu" },
      { label: "Tốc độ 5G", value: "10Gbps", description: "Truyền dữ liệu" },
      { label: "Tiết kiệm năng lượng", value: "30%", description: "Smart City" }
    ],
    image: "/pracitcal/pmc.png"
  },
  {
    id: "knowledge-economy",
    title: "Kinh tế tri thức",
    subtitle: "Dựa vào tri thức và sáng tạo",
    icon: "💡",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    color: "#F59E0B",
    content: "Kinh tế tri thức thể hiện rõ ở những quốc gia phát triển như Mỹ, Nhật Bản, Hàn Quốc, nơi giá trị kinh tế dựa vào tri thức, nghiên cứu khoa học và đổi mới sáng tạo.",
    features: ["Tri thức", "Nghiên cứu khoa học", "Đổi mới sáng tạo"],
    examples: ["Mỹ", "Nhật Bản", "Hàn Quốc"],
    statistics: [
      { label: "Đầu tư R&D", value: "3.2%", description: "GDP Mỹ" },
      { label: "Bằng sáng chế", value: "1.2M", description: "Năm 2024" },
      { label: "Startup", value: "50K", description: "Toàn cầu" }
    ],
    image: "/pracitcal/asean.png"
  },
  {
    id: "conflicts",
    title: "Xung đột đương đại",
    subtitle: "Sắc tộc, tôn giáo, kinh tế",
    icon: "⚔️",
    gradient: "from-red-500 via-pink-500 to-purple-500",
    color: "#EF4444",
    content: "Sự xung đột giai cấp vẫn còn, nhưng không gay gắt như trước; thay vào đó là xung đột về sắc tộc, tôn giáo, và kinh tế giữa các quốc gia, khu vực.",
    features: ["Xung đột sắc tộc", "Xung đột tôn giáo", "Xung đột kinh tế"],
    examples: ["Khủng hoảng thương mại", "Căng thẳng quốc tế", "Bất ổn khu vực"],
    statistics: [
      { label: "Xung đột toàn cầu", value: "180", description: "Năm 2024" },
      { label: "Người tị nạn", value: "110M", description: "Toàn cầu" },
      { label: "Thiệt hại kinh tế", value: "$2.8T", description: "Năm 2024" }
    ],
    image: "/pracitcal/pmc.png"
  },
  {
    id: "dialogue",
    title: "Xu hướng đối thoại",
    subtitle: "Hòa giải và hợp tác",
    icon: "🤝",
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    color: "#6366F1",
    content: "Vì lợi ích chung của toàn thế giới, xu hướng đối thoại, hòa giải trở thành xu hướng chủ đạo.",
    features: ["Đối thoại", "Hòa giải", "Hợp tác"],
    examples: ["Cộng đồng quốc tế", "Liên Hợp Quốc", "Tổ chức quốc tế"],
    statistics: [
      { label: "Hiệp định hòa bình", value: "45", description: "Năm 2024" },
      { label: "Tổ chức quốc tế", value: "300+", description: "Toàn cầu" },
      { label: "Hợp tác kinh tế", value: "85%", description: "Các nước" }
    ],
    image: "/pracitcal/asean.png"
  },
  {
    id: "vietnam",
    title: "Việt Nam hội nhập",
    subtitle: "Đa phương hóa, đa dạng hóa",
    icon: "🇻🇳",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    color: "#059669",
    content: "Việt Nam với đường lối đối ngoại đa phương hóa, đa dạng hóa, \"làm bạn với tất cả các nước\", vừa hợp tác phát triển kinh tế, vừa giữ vững độc lập – chủ quyền.",
    features: ["Đa phương hóa", "Đa dạng hóa", "Độc lập chủ quyền"],
    examples: ["ASEAN", "APEC", "WTO"],
    statistics: [
      { label: "Tăng trưởng GDP", value: "6.5%", description: "Năm 2024" },
      { label: "Xuất khẩu", value: "$400B", description: "Năm 2024" },
      { label: "Đầu tư FDI", value: "$20B", description: "Năm 2024" }
    ],
    image: "/pracitcal/pmc.png"
  }
];
