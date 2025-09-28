# 🇻🇳 3D Vietnam Flag Scene

## Cài đặt và Chạy

1. **Đặt ảnh cờ**: Đặt file `vn.png` vào thư mục `/public/flags/`
2. **Chạy dev server**: `npm run dev`
3. **Mở trình duyệt**: Truy cập `http://localhost:5174`

## Tính năng

### ✨ **Hiệu ứng 3D Cinematic**

- **Lơ lửng tự nhiên** với Float animation
- **Gió đa lớp** - 3 lớp sóng chồng nhau tạo chuyển động realistic
- **Ánh sáng ấm** với Environment preset "sunset"
- **Bóng đổ realistic** với shadow mapping

### 🎮 **Tương tác**

- **Kéo để xoay** - PresentationControls với giới hạn hợp lý
- **Zoom** - Cuộn chuột để zoom in/out
- **Smooth controls** - Không bị giật lag

### 🎨 **Chất lượng cao**

- **Custom Shader Material** - 3 lớp wave với lighting realistic
- **High-res geometry** - 128x64 segments mặc định
- **Anisotropic filtering** - Texture sắc nét
- **Anti-aliasing** - Edges mượt mà

## Props API

```typescript
type FlagSceneProps = {
  textureUrl?: string; // default "/flags/vn.png"
  flagSize?: [number, number]; // default [1.6, 1.0]
  segments?: [number, number]; // default [128, 64]
  waves?: {
    // Layer 1 - Main wind effect
    amp1?: number; // default 0.06
    freq1?: number; // default 3.0
    speed1?: number; // default 1.2

    // Layer 2 - Medium ripples
    amp2?: number; // default 0.02
    freq2?: number; // default 6.0
    speed2?: number; // default 1.8

    // Layer 3 - Fine details
    amp3?: number; // default 0.01
    freq3?: number; // default 9.0
    speed3?: number; // default 2.3
  };
  windPinStart?: number; // default 0.15 (0-0.25)
  withPole?: boolean; // default true
};
```

## Tùy chỉnh hiệu ứng

### 🌪️ **Tăng cường gió**

```tsx
<FlagScene
  waves={{
    amp1: 0.08, // Tăng từ 0.06
    speed1: 1.5, // Tăng từ 1.2
    amp2: 0.03, // Tăng từ 0.02
    speed2: 2.2, // Tăng từ 1.8
  }}
/>
```

### 🎯 **Giảm segments cho performance**

```tsx
<FlagScene
  segments={[96, 48]} // Giảm từ [128, 64]
/>
```

### 📏 **Thay đổi kích thước**

```tsx
<FlagScene
  flagSize={[2.0, 1.25]} // Lớn hơn
  windPinStart={0.2} // Tăng vùng pin
/>
```

### 🎨 **Custom texture**

```tsx
<FlagScene textureUrl="/custom-flag.png" />
```

## Kỹ thuật Implementation

### 🔧 **Shader Material**

- **3-layer wave system** - Realistic wind simulation
- **Pin factor** - Giảm amplitude gần cột cờ
- **Edge factor** - Giảm wave ở mép trên/dưới
- **Dynamic normals** - Lighting realistic
- **Fabric shading** - Subtle texture effect

### 💡 **Lighting Setup**

- **Ambient**: 0.8 intensity
- **Directional**: 1.2 intensity từ [2,2,2]
- **Shadow mapping**: 2048x2048 resolution
- **Environment**: Sunset preset

### 🎭 **Controls**

- **Polar limits**: ±30° (vertical rotation)
- **Azimuth limits**: ±45° (horizontal rotation)
- **Float animation**: Subtle floating effect

### 📱 **Performance**

- **GPU optimized** - Shader-based animation
- **Efficient geometry** - Configurable segments
- **Texture optimization** - Anisotropic filtering
- **Fallback system** - Canvas-generated placeholder

## Troubleshooting

### ❌ **Texture không load**

- Kiểm tra file `/public/flags/vn.png` có tồn tại
- Placeholder tự động được tạo nếu file không có
- Check console log để xem lỗi loading

### 🐌 **Performance thấp**

- Giảm segments: `segments={[64, 32]}`
- Tắt shadows: Sửa `shadows={false}` trong Canvas
- Giảm wave layers: Set amp3=0

### 🖱️ **Controls không hoạt động**

- Kiểm tra Three.js dependencies đã cài đúng
- Đảm bảo Canvas có đủ không gian
- Check browser console cho errors

## Stack

- **three@^0.180.0** - 3D engine
- **@react-three/fiber@^9.3.0** - React Three.js
- **@react-three/drei@^10.7.6** - Utilities
- **Vite + React + TypeScript** - Build system
