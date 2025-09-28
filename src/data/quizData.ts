export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export const QUIZ_CONFIG = {
  totalQuestions: 10,
  timePerQuestion: 30, // seconds
  totalTime: 20 * 60, // 20 minutes in seconds
  passingScore: 70, // percentage
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Theo nguồn, yếu tố nào phải xuất hiện để dẫn đến sự ra đời của nhà nước?",
    options: [
      "Sự phát triển dân số và nhu cầu quản lý lãnh thổ.",
      "Xuất hiện của cải dư thừa, chế độ tư hữu và mâu thuẫn giai cấp không thể điều hòa.",
      "Nhu cầu bảo vệ quốc gia khỏi các thế lực bên ngoài.",
      "Sự phân công lao động xã hội và hình thành tầng lớp trí thức."
    ],
    correctAnswer: 1,
    explanation: "Nhà nước xuất hiện khi lực lượng sản xuất phát triển, dẫn đến sự xuất hiện của cải dư thừa, chế độ tư hữu ra đời, hình thành giai cấp và mâu thuẫn giai cấp không thể điều hòa."
  },
  {
    id: "q2",
    question: "Theo quan điểm của C. Mác được V.I. Lênin khẳng định lại trong tác phẩm \"Nhà nước và cách mạng,\" bản chất của nhà nước là gì?",
    options: [
      "Là thiết chế quản lý xã hội, đại diện cho ý chí của toàn dân tộc.",
      "Là một cơ quan thống trị giai cấp, là cơ quan bạo lực của một giai cấp này đối với một giai cấp khác.",
      "Là tổ chức được lập ra nhằm điều hòa mọi xung đột giai cấp trong xã hội",
      "Là cơ quan duy trì trật tự xã hội bằng các biện pháp dân chủ."
    ],
    correctAnswer: 1,
    explanation: "V.I. Lênin khẳng định lại quan điểm của C. Mác rằng nhà nước là \"một cơ quan thống trị giai cấp, là một cơ quan bạo lực của một giai cấp này đối với một giai cấp khác\"."
  },
  {
    id: "q3",
    question: "Đặc trưng cơ bản nào của nhà nước được thể hiện qua ví dụ việc cấp hộ chiếu và kiểm soát xuất nhập cảnh tại các cửa khẩu ở Việt Nam?",
    options: [
      "Có hệ thống cơ quan quyền lực chuyên nghiệp.",
      "Có hệ thống thuế khóa để duy trì hoạt động.",
      "Quản lý cư dân trên một lãnh thổ nhất định.",
      "Duy trì sự thống trị giai cấp."
    ],
    correctAnswer: 2,
    explanation: "Việc cấp hộ chiếu và kiểm soát xuất nhập cảnh thể hiện nhà nước quản lý mọi công dân sống trong lãnh thổ quốc gia (đất liền, vùng biển, vùng trời)."
  },
  {
    id: "q4",
    question: "Đặc trưng nào của nhà nước cho phép duy trì hoạt động của bộ máy hành chính, quốc phòng và an ninh (như trả lương cho công chức, đầu tư cơ sở hạ tầng)?",
    options: [
      "Quản lý cư dân trên một lãnh thổ nhất định.",
      "Có hệ thống cơ quan quyền lực chuyên nghiệp.",
      "Có hệ thống thuế khóa để duy trì hoạt động.",
      "Bảo vệ lợi ích giai cấp thống trị."
    ],
    correctAnswer: 2,
    explanation: "Nhà nước thu các loại thuế (thuế thu nhập cá nhân, VAT, thuế doanh nghiệp) để duy trì hoạt động của bộ máy nhà nước."
  },
  {
    id: "q5",
    question: "Theo nguồn, chức năng chính trị cơ bản của nhà nước là gì?",
    options: [
      "Giữ trật tự xã hội và quản lý kinh tế – xã hội.",
      "Củng cố và thúc đẩy xã hội phát triển, định hướng chính trị.",
      "Duy trì sự thống trị giai cấp, ổn định chính trị, bảo vệ lợi ích giai cấp cầm quyền.",
      "Bảo vệ lãnh thổ và giao lưu kinh tế với các quốc gia khác."
    ],
    correctAnswer: 2,
    explanation: "Chức năng chính trị của nhà nước là duy trì sự thống trị giai cấp, ổn định chính trị, bảo vệ lợi ích giai cấp cầm quyền"
  },
  {
    id: "q6",
    question: "Trong các yếu tố cơ bản của cách mạng xã hội, \"Động lực\" được xác định là gì?",
    options: [
      "Giai cấp, tầng lớp, quần chúng có lợi ích gắn với cách mạng.",
      "Các giai cấp có lợi ích lâu dài gắn bó với cách mạng.",
      "Giai cấp, chế độ xã hội bị lật đổ.",
      "Giai cấp đại diện cho xu hướng tiến bộ của xã hội."
    ],
    correctAnswer: 1,
    explanation: "Động lực của cách mạng là các giai cấp có lợi ích lâu dài gắn bó với cách mạng."
  },
  {
    id: "q7",
    question: "Phương pháp giành chính quyền nào được xem là phương pháp hòa bình trong cách mạng xã hội, trong điều kiện cho phép?",
    options: [
      "Dùng bạo lực lật đổ bộ máy nhà nước cũ.",
      "Tiến hành đấu tranh nghị trường, bầu cử dân chủ.",
      "Tổ chức tổng bãi công và đình công.",
      "Thành lập các lực lượng vũ trang chuyên nghiệp."
    ],
    correctAnswer: 1,
    explanation: "Phương pháp hòa bình bao gồm giành chính quyền bằng đấu tranh nghị trường, bầu cử dân chủ."
  },
  {
    id: "q8",
    question: "Xu hướng chủ đạo trong quan hệ quốc tế nhằm giải quyết các vấn đề toàn cầu hiện nay là gì?",
    options: [
      "Xung đột về sắc tộc, tôn giáo và kinh tế giữa các quốc gia.",
      "Chiến tranh dưới màu sắc chiêu bài \"nhân đạo.\"",
      "Xu hướng đối thoại, hòa giải.",
      "Đẩy mạnh cạnh tranh vũ khí hóa học."
    ],
    correctAnswer: 2,
    explanation: "Vì lợi ích chung của toàn thế giới, xu hướng đối thoại, hòa giải trở thành xu hướng chủ đạo."
  },
  {
    id: "q9",
    question: "Hiện nay, bên cạnh xung đột giai cấp (không còn gay gắt như trước), các xung đột nào đang nổi lên trong thế giới đương đại?",
    options: [
      "Xung đột giữa người giàu và người nghèo.",
      "Xung đột về sắc tộc, tôn giáo và kinh tế giữa các quốc gia, khu vực.",
      "Xung đột giữa nông nghiệp và công nghiệp.",
      "Xung đột giữa công nghệ AI và lao động phổ thông."
    ],
    correctAnswer: 1,
    explanation: "Sự xung đột giai cấp vẫn còn, nhưng không gay gắt; thay vào đó là xung đột về sắc tộc, tôn giáo, và kinh tế giữa các quốc gia, khu vực."
  },
  {
    id: "q10",
    question: "Mục tiêu hiện nay của Việt Nam trong xu hướng phát triển xã hội là gì?",
    options: [
      "Trở thành cường quốc công nghệ và quân sự.",
      "Dân giàu, nước mạnh, xã hội công bằng, dân chủ, văn minh.",
      "Bảo vệ lãnh thổ và tham gia các cuộc chiến chống khủng bố.",
      "Đẩy mạnh tư nhân hóa toàn bộ nền kinh tế."
    ],
    correctAnswer: 1,
    explanation: "Mục tiêu của Việt Nam hiện nay là dân giàu, nước mạnh, xã hội công bằng, dân chủ, văn minh."
  }
];