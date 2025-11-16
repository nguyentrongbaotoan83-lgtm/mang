
import { QuizActivityData } from './types';

export const SUBMISSIONS_COLLECTION = 'quiz_submissions';

export const quizData: QuizActivityData[] = [
  // Activity 1: Hub and Switch (4 questions)
  {
    id: 1,
    activity: 'Hub và Switch',
    questions: [
      {
        q: "Thiết bị nào khi nhận dữ liệu sẽ gửi tín hiệu đến tất cả các cổng còn lại, dễ gây xung đột tín hiệu (collision)?",
        options: ["Router", "Switch", "Hub", "Modem"],
        answer: "Hub",
        score: 10
      },
      {
        q: "Điểm khác biệt chính của **Switch** so với Hub nằm ở đâu?",
        options: ["Sử dụng cáp quang", "Có khả năng Wi-Fi", "Xác định cổng gửi và nhận, thiết lập kênh truyền tạm thời", "Chuyển đổi tín hiệu số sang tương tự"],
        answer: "Xác định cổng gửi và nhận, thiết lập kênh truyền tạm thời",
        score: 10
      },
      {
        q: "Với các mạng có ít thiết bị đầu cuối (mạng gia đình) có thể dùng Hub vì lí do gì?",
        options: ["Hub chống xung đột tốt hơn", "Hub có nhiều cổng WAN", "Chi phí rẻ hơn rất nhiều so với Switch", "Hub có tích hợp Modem"],
        answer: "Chi phí rẻ hơn rất nhiều so với Switch",
        score: 10
      },
      {
        q: "Hiện tượng xung đột tín hiệu xảy ra khi nào trong mạng LAN?",
        options: ["Khi Router bị lỗi", "Khi nhiều máy đồng thời gửi dữ liệu lên đường truyền chung", "Khi modem bị ngắt kết nối", "Khi máy tính dùng cáp UTP"],
        answer: "Khi nhiều máy đồng thời gửi dữ liệu lên đường truyền chung",
        score: 10
      },
    ]
  },
  // Activity 2: WAP and Router (4 questions)
  {
    id: 2,
    activity: 'WAP và Router',
    questions: [
      {
        q: "Wi-Fi là chữ viết tắt của cụm từ nào?",
        options: ["Wide Final", "Wired Fiber", "Wireless Fidelity", "Web Fast"],
        answer: "Wireless Fidelity",
        score: 10
      },
      {
        q: "Thiết bị nào còn được gọi là 'điểm truy cập không dây' (Access Point - AP) và dùng để kết nối các thiết bị bằng sóng Wi-Fi?",
        options: ["Switch", "Hub", "Bộ thu phát Wi-Fi (WAP)", "Modem"],
        answer: "Bộ thu phát Wi-Fi (WAP)",
        score: 10
      },
      {
        q: "Chức năng chính của Router là gì?",
        options: ["Chuyển đổi tín hiệu", "Kết nối các máy tính trong cùng LAN", "Dẫn đường (routing) cho dữ liệu trên mạng rộng (Internet)", "Gửi tín hiệu đến tất cả các cổng"],
        answer: "Dẫn đường (routing) cho dữ liệu trên mạng rộng (Internet)",
        score: 10
      },
      {
        q: "Cổng nào của Router được dùng để kết nối với các Router khác hoặc kết nối ra ngoài Internet (trên các Router lớn)?",
        options: ["Cổng SIM", "Cổng LAN", "Cổng ADSL", "Cổng WAN"],
        answer: "Cổng WAN",
        score: 10
      },
    ]
  },
  // Activity 3: Modem and Connection (4 questions)
  {
    id: 3,
    activity: 'Modem và Kết nối',
    questions: [
      {
        q: "Chức năng của **Modem** là gì khi kết nối LAN với Internet?",
        options: ["Thực hiện định tuyến", "Tạo sóng Wi-Fi", "Chuyển đổi tín hiệu số thành tín hiệu tương tự và ngược lại", "Loại bỏ xung đột tín hiệu"],
        answer: "Chuyển đổi tín hiệu số thành tín hiệu tương tự và ngược lại",
        score: 10
      },
      {
        q: "Tên gọi Modem là viết tắt của hai quá trình nào?",
        options: ["Monitoring và Demultiplexing", "Measuring và Decoding", "Modulation và Demodulation", "Managing và Deploying"],
        answer: "Modulation và Demodulation",
        score: 10
      },
      {
        q: "Để kết nối có dây, máy tính thường dùng cáp UTP với giắc cắm nào để cắm vào cổng LAN của thiết bị mạng?",
        options: ["RJ11", "USB", "RJ45", "HDMI"],
        answer: "RJ45",
        score: 10
      },
      {
        q: "Làm thế nào để máy tính xách tay (có khả năng Wi-Fi) kết nối Internet qua mạng điện thoại di động khi không có SIM?",
        options: ["Chỉ cần cắm cáp mạng", "Dùng Router cố định", "Sử dụng Modem ADSL", "Kết nối qua Wi-Fi phát ra từ điện thoại/modem 3G/4G/5G"],
        answer: "Kết nối qua Wi-Fi phát ra từ điện thoại/modem 3G/4G/5G",
        score: 10
      },
    ]
  }
];
