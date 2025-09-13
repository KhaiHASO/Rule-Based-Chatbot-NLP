// Rule-Based Chatbot cho Thư Viện - Ứng dụng đơn giản
class LibraryChatbotApp {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.initializeRules();
        this.addHoverEffects();
    }

    initializeElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.quickBtns = document.querySelectorAll('.quick-btn');
    }

    bindEvents() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        this.quickBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.getAttribute('data-question');
                this.userInput.value = question;
                this.sendMessage();
            });
        });

        // Auto-focus on input when clicking anywhere in chat
        this.chatMessages.addEventListener('click', () => {
            this.userInput.focus();
        });
    }

    // Định nghĩa 12 quy tắc keyword-response cho thư viện
    initializeRules() {
        this.rules = [
            // Quy tắc 1: Giờ mở cửa
            {
                keywords: ['giờ', 'mở', 'cửa', 'thời gian', 'hoạt động', 'hours', 'open', 'time', 'khi nào'],
                response: "🕒 <strong>Giờ mở cửa thư viện:</strong><br>• Thứ 2 - Thứ 6: 8:00 sáng - 10:00 tối<br>• Thứ 7 - Chủ nhật: 9:00 sáng - 8:00 tối<br>• Thư viện mở cửa tất cả các ngày trong tuần"
            },
            
            // Quy tắc 2: Làm thẻ thư viện
            {
                keywords: ['làm', 'thẻ', 'đăng ký', 'thành viên', 'card', 'register', 'membership', 'tạo thẻ'],
                response: "🆔 <strong>Làm thẻ thư viện:</strong><br>• Mang theo: CMND/CCCD + ảnh 3x4<br>• Phí làm thẻ: 50,000 VNĐ<br>• Thời gian xử lý: 1-2 ngày làm việc<br>• Thẻ có hiệu lực 1 năm"
            },
            
            // Quy tắc 3: Mượn sách
            {
                keywords: ['mượn', 'sách', 'lấy', 'borrow', 'book', 'lending', 'mượn sách'],
                response: "📚 <strong>Quy định mượn sách:</strong><br>• Tối đa: 5 cuốn sách/người<br>• Thời hạn: 14 ngày (sách thường), 30 ngày (sách giáo trình)<br>• Cần có thẻ thư viện hợp lệ<br>• Có thể đặt mượn sách đang được mượn"
            },
            
            // Quy tắc 4: Trả sách
            {
                keywords: ['trả', 'sách', 'hoàn', 'return', 'give back', 'trả sách'],
                response: "↩️ <strong>Hướng dẫn trả sách:</strong><br>• Trả tại quầy lưu thông hoặc hộp trả sách tự động<br>• Kiểm tra tình trạng sách trước khi trả<br>• Sách trả muộn sẽ bị phạt phí<br>• Có thể trả sách ngoài giờ tại hộp tự động"
            },
            
            // Quy tắc 5: Gia hạn sách
            {
                keywords: ['gia hạn', 'kéo dài', 'renew', 'extend', 'thêm thời gian', 'gia hạn sách'],
                response: "📅 <strong>Gia hạn sách:</strong><br>• Gia hạn được 1 lần qua website hoặc điện thoại<br>• Thời gian gia hạn: 7 ngày<br>• Điều kiện: Không có người khác đặt mượn<br>• Phí gia hạn: 5,000 VNĐ/cuốn"
            },
            
            // Quy tắc 6: Phí phạt
            {
                keywords: ['phí', 'phạt', 'tiền', 'fine', 'penalty', 'trả muộn', 'phí phạt'],
                response: "⚠️ <strong>Bảng phí phạt:</strong><br>• Trả sách muộn: 2,000 VNĐ/ngày/cuốn<br>• Sách mất: Đền gấp 2 lần giá trị sách<br>• Phí phạt tối đa: 100,000 VNĐ/cuốn<br>• Thanh toán tại quầy lưu thông"
            },
            
            // Quy tắc 7: Tìm sách
            {
                keywords: ['tìm', 'sách', 'tìm kiếm', 'search', 'find', 'locate', 'tìm sách'],
                response: "🔍 <strong>Tìm kiếm sách:</strong><br>• Sử dụng hệ thống OPAC trên website thư viện<br>• Hỏi nhân viên tại quầy thông tin<br>• Sách được sắp xếp theo mã phân loại Dewey<br>• Có thể đặt mượn sách đang được mượn"
            },
            
            // Quy tắc 8: Quy định thư viện
            {
                keywords: ['quy định', 'nội quy', 'luật', 'rules', 'regulations', 'policy', 'quy định'],
                response: "📋 <strong>Nội quy thư viện:</strong><br>• Không ăn uống trong khu vực đọc sách<br>• Giữ im lặng tuyệt đối<br>• Tắt điện thoại hoặc để chế độ im lặng<br>• Không mang túi lớn vào khu vực đọc sách<br>• Vi phạm sẽ bị cảnh cáo hoặc tạm dừng thẻ"
            },
            
            // Quy tắc 9: Dịch vụ photocopy
            {
                keywords: ['photocopy', 'sao chép', 'in ấn', 'copy', 'print', 'photocopy'],
                response: "📄 <strong>Dịch vụ photocopy:</strong><br>• Vị trí: Tầng 1 thư viện<br>• Giá: 500 VNĐ/trang A4<br>• Quy định: Copy tối đa 30% nội dung sách<br>• Cần xuất trình thẻ thư viện<br>• Thanh toán bằng tiền mặt"
            },
            
            // Quy tắc 10: Wifi và máy tính
            {
                keywords: ['wifi', 'internet', 'máy tính', 'computer', 'mạng', 'wifi'],
                response: "💻 <strong>Dịch vụ công nghệ:</strong><br>• WiFi miễn phí: Library_WiFi (mật khẩu: lib2024)<br>• Máy tính công cộng: 20 máy tại tầng 2<br>• Thời gian sử dụng: 2 giờ/phiên<br>• Cần thẻ thư viện để đăng nhập<br>• Hỗ trợ in ấn từ máy tính"
            },
            
            // Quy tắc 11: Đặt chỗ ngồi
            {
                keywords: ['đặt', 'chỗ', 'bàn', 'ghế', 'reserve', 'seat', 'place', 'đặt chỗ'],
                response: "🪑 <strong>Đặt chỗ ngồi:</strong><br>• Đặt qua app thư viện hoặc website<br>• Mỗi người đặt tối đa 4 giờ/ngày<br>• Đến muộn quá 15 phút sẽ mất chỗ<br>• Có thể gia hạn nếu không có người khác đặt<br>• Chỗ ngồi được đánh số rõ ràng"
            },
            
            // Quy tắc 12: Sự kiện và hoạt động
            {
                keywords: ['sự kiện', 'hoạt động', 'hội thảo', 'event', 'activity', 'seminar', 'sự kiện'],
                response: "🎉 <strong>Sự kiện thư viện:</strong><br>• Hội thảo học thuật hàng tháng<br>• Triển lãm sách theo chủ đề<br>• Workshop kỹ năng học tập<br>• Thông tin chi tiết trên website và bảng thông báo<br>• Đăng ký miễn phí cho thành viên"
            }
        ];

        // Câu trả lời mặc định khi không tìm thấy quy tắc phù hợp
        this.defaultResponses = [
            "🤔 Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn có thể hỏi về giờ mở cửa, mượn sách, quy định thư viện...",
            "❓ Tôi không có thông tin về vấn đề này. Vui lòng liên hệ nhân viên thư viện để được hỗ trợ chi tiết.",
            "💡 Câu hỏi của bạn nằm ngoài phạm vi hỗ trợ của tôi. Bạn có thể thử hỏi về các dịch vụ cơ bản của thư viện.",
            "🔄 Tôi chưa được lập trình để trả lời câu hỏi này. Hãy thử hỏi về giờ mở cửa, mượn trả sách, hoặc quy định thư viện."
        ];
    }

    // Gửi tin nhắn
    sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Hiển thị tin nhắn người dùng
        this.addMessage(message, 'user');
        this.userInput.value = '';

        // Hiển thị typing indicator
        this.showTypingIndicator();

        // Xử lý phản hồi sau 1-2 giây (mô phỏng thời gian xử lý)
        const delay = Math.random() * 1000 + 1000; // 1-2 giây
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.getResponse(message);
            this.addMessage(response, 'bot');
        }, delay);
    }

    // Thêm tin nhắn vào chat
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        if (sender === 'bot') {
            contentDiv.innerHTML = `
                <i class="fas fa-robot"></i>
                <div>${content}</div>
            `;
        } else {
            contentDiv.innerHTML = `
                <i class="fas fa-user"></i>
                <p>${content}</p>
            `;
        }

        messageDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(messageDiv);

        // Cuộn xuống cuối
        this.scrollToBottom();
    }

    // Hiển thị typing indicator
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-robot"></i>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    // Ẩn typing indicator
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Lấy phản hồi dựa trên tin nhắn
    getResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Tìm quy tắc phù hợp
        for (const rule of this.rules) {
            const matchedKeywords = rule.keywords.filter(keyword => 
                lowerMessage.includes(keyword.toLowerCase())
            );
            
            if (matchedKeywords.length > 0) {
                return rule.response;
            }
        }

        // Nếu không tìm thấy quy tắc phù hợp, trả về câu trả lời mặc định
        const randomIndex = Math.floor(Math.random() * this.defaultResponses.length);
        return this.defaultResponses[randomIndex];
    }

    // Cuộn xuống cuối chat
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    // Thêm hiệu ứng hover và tương tác
    addHoverEffects() {
        // Hiệu ứng hover cho quick buttons
        this.quickBtns.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
            });

            btn.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(-1px)';
            });

            btn.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-3px)';
            });
        });

        // Hiệu ứng focus cho input
        this.userInput.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
            this.style.background = 'white';
            this.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
            this.style.transform = 'translateY(-1px)';
        });
        
        this.userInput.addEventListener('blur', function() {
            this.style.borderColor = '#e9ecef';
            this.style.background = '#f8f9fa';
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0)';
        });

        // Hiệu ứng cho send button
        this.sendBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
        });

        this.sendBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
        });

        // Hiệu ứng cho message cards
        const messageObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node.classList.contains('message')) {
                            // Thêm hiệu ứng fade in cho tin nhắn mới
                            node.style.opacity = '0';
                            node.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                node.style.transition = 'all 0.4s ease';
                                node.style.opacity = '1';
                                node.style.transform = 'translateY(0)';
                            }, 50);
                        }
                    });
                }
            });
        });

        messageObserver.observe(this.chatMessages, { childList: true });
    }
}

// Khởi tạo chatbot khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    new LibraryChatbotApp();
});

// Thêm một số tính năng bổ sung
document.addEventListener('DOMContentLoaded', () => {
    // Auto-resize input khi nhập nhiều dòng
    const userInput = document.getElementById('userInput');
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });

    // Thêm hiệu ứng loading khi gửi tin nhắn
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // Thêm hiệu ứng cho quick buttons khi click
    const quickBtns = document.querySelectorAll('.quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});
