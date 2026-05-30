# 前端网站优化

在不登录的情况下，如何确认用户浏览的身份，要最严格的避免重复身份。即使在无痕浏览器里也不会出现同一个用户浏览，系统判定为新用户。
优化记录用户在前端官网浏览了哪些模块，然后存到数据库，在后端管理变成可视化内容（什么时候传到数据库；如何避免丢客户数据：他关闭浏览器或者关闭网站切换到后台；多久传一次，避免资源浪费，数据库、路由等压力过大）

全局内容：收藏、搜索图标，他们在所有页面都会显示在靠左边窗口。点击跳转到表单页、和打开收藏列表页。

导航栏（有两个样式：暗色系、白色系）

导航栏内容：首页、产品中心、联系我们、场地设计、关于我们；搜索图标；收藏图标；

导航栏交互：首页、产品中心、联系我们、场地设计、关于我们为一个整体用这个代码块的交互。搜索图标、收藏图标不参与代码块交互。

产品中心是一个多级下拉菜单栏设计；关于我们是一个单个下拉菜单栏设计

```TypeScript
// --- Component ---
"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { Home, Settings, Bell, User, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { ThemeProvider } from "next-themes"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="flex items-center space-x-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === "dark" ? "text-[#A1A1AA] scale-75 rotate-12" : "text-foreground scale-100 rotate-0"
        }`}
      />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
        className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110"
      />
      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === "light" ? "text-[#A1A1AA] scale-75 rotate-12" : "text-foreground scale-100 rotate-0"
        }`}
      />
    </div>
  )
}

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  gradient: string
  iconColor: string
}

const menuItems: MenuItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "Home",
    href: "#",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: <Bell className="h-5 w-5" />,
    label: "Notifications",
    href: "#",
    gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    href: "#",
    gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: <User className="h-5 w-5" />,
    label: "Profile",
    href: "#",
    gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
]

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

function MenuBar() {
  const { theme } = useTheme()

  const isDarkTheme = theme === "dark"

  return (
    <motion.nav
      className="p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden"
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className={`absolute -inset-2 bg-gradient-radial from-transparent ${
          isDarkTheme
            ? "via-blue-400/30 via-30% via-purple-400/30 via-60% via-red-400/30 via-90%"
            : "via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90%"
        } to-transparent rounded-3xl z-0 pointer-events-none`}
        variants={navGlowVariants}
      />
      <ul className="flex items-center gap-2 relative z-10">
        {menuItems.map((item) => (
          <motion.li key={item.label} className="relative">
            <motion.div
              className="block rounded-xl overflow-visible group relative"
              style={{ perspective: "600px" }}
              whileHover="hover"
              initial="initial"
            >
              <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                variants={glowVariants}
                style={{
                  background: item.gradient,
                  opacity: 0,
                  borderRadius: "16px",
                }}
              />
              <motion.a
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
                variants={itemVariants}
                transition={sharedTransition}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
              >
                <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </motion.a>
              <motion.a
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
                variants={backVariants}
                transition={sharedTransition}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
              >
                <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </motion.a>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  )
}

export default function Page1() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableSystemTheme>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="mb-[120px]">
          <ThemeToggle />
        </div>
        <MenuBar />
      </div>
    </ThemeProvider>
  )
}


// --- Demo ---
import Page1 from "@/components/ui/glow-menu";

export default function DemoOne() {
  return <Page1 />;
}

```

### 首页内容：

1\.第一屏是视频为背景，文字介绍“

loson科技 – Leading Manufacturer of Premium Arcade Machines

Specializing in a wide range of indoor arcade machines, including classic and modern games, claw machines, VR setups, and kiddie rides, designed for entertainment venues worldwide\.

🎯 15\+ Years of Manufacturing Experience        🔬 Advanced R\&amp;D \&amp; Customization        🏢 Complete One\-Stop Solutions        🌍 Trusted by Clients Worldwide        ✅ Certified Quality Assurance

”

2\.热门产品分类：拳击机、娃娃机、赛车机、vR、飞镖机、音乐机、体育机。由图片\+标题\+说明组成，默认不显示标题和说明，当鼠标移入才会显示，具体根据代码块布局：

```HTML
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>精确尺寸草图还原</title>
    <style>
        /* --- 1. 基础重置 --- */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background-color: #1a1a1a;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            padding: 40px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        /* --- 2. 核心网格容器 (完全映射草图尺寸比例) --- */
        .gourmet-grid {
            display: grid;
            /* 严格按照草图的宽度比例切分 5 列 */
            grid-template-columns: 300fr 600fr 300fr 280fr 280fr;
            gap: 15px; /* 全局统一间距 */
            width: 100%;
            max-width: 1600px;
        }

        /* --- 3. 精准卡片定位与尺寸映射 --- */
        
        /* 图1：300*600 (占第1列，跨2行) */
        .img-card-1 {
            grid-column: 1;
            grid-row: 1 / span 2;
        }

        /* 图2：600*600 (占第2列，跨2行) */
        .img-card-2 {
            grid-column: 2;
            grid-row: 1 / span 2;
        }

        /* 图3：300*280 (占第3列，第1行) */
        .img-card-3 {
            grid-column: 3;
            grid-row: 1;
            /* 核心：用它的比例撑开第一行的高度 */
            aspect-ratio: 300 / 280; 
        }

        /* 图4：300*280 (占第3列，第2行) */
        .img-card-4 {
            grid-column: 3;
            grid-row: 2;
            /* 核心：用它的比例撑开第二行的高度 */
            aspect-ratio: 300 / 280;
        }

        /* 图5：600*280 横宽图 (跨越第4、5列，第1行) */
        .img-card-5 {
            grid-column: 4 / span 2;
            grid-row: 1;
        }

        /* 图6：280*280 正方形 (占第4列，第2行) */
        .img-card-6 {
            grid-column: 4;
            grid-row: 2;
        }

        /* 图7：280*280 正方形 (占第5列，第2行) */
        .img-card-7 {
            grid-column: 5;
            grid-row: 2;
        }


        /* --- 4. 交互与动画效果 (保持原需求) --- */
        .dynamic-card {
            position: relative;
            overflow: hidden; /* 制造裁剪效果 */
            background-color: #2c2c2c;
            height: 100%;
            width: 100%;
        }

        .dynamic-card .card-media {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* 移入时：图片轻微向上平移并放大，配合 overflow:hidden 形成裁剪感 */
        .dynamic-card:hover .card-media {
            transform: translateY(-15px) scale(1.02);
        }

        /* 隐藏在下方的文字块 */
        .hover-info {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #ffffff;
            padding: 20px;
            /* 默认沉到底部外部 */
            transform: translateY(100%);
            transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            z-index: 2;
        }

        /* 移入时：文字块从下往上浮现 */
        .dynamic-card:hover .hover-info {
            transform: translateY(0);
        }

        .hover-info h3 {
            font-size: clamp(13px, 1.2vw, 16px);
            color: #111;
            text-transform: uppercase;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .hover-info p {
            font-size: clamp(10px, 0.9vw, 12px);
            color: #57bfa3;
            text-transform: uppercase;
            font-weight: bold;
        }

        /* --- 5. 优雅降级 (响应式处理) --- */
        /* 在较小屏幕上放弃精准比例，转为易读的常规网格 */
        @media (max-width: 1200px) {
            .gourmet-grid {
                grid-template-columns: repeat(3, 1fr);
            }
            .dynamic-card { grid-column: auto !important; grid-row: auto !important; aspect-ratio: 1 / 1 !important; }
            .img-card-2 { grid-column: span 2 !important; grid-row: span 2 !important; }
        }

        @media (max-width: 768px) {
            .gourmet-grid {
                grid-template-columns: 1fr;
            }
            .dynamic-card { aspect-ratio: 4 / 3 !important; }
            .img-card-2 { grid-column: 1 !important; grid-row: auto !important; }
        }
    </style>
</head>
<body>

    <div class="gourmet-grid">
        <div class="dynamic-card img-card-1">
            <img src="https://picsum.photos/300/600?random=1" alt="图1" class="card-media">
            <div class="hover-info">
                <h3>Vertical Image</h3>
                <p>300 x 600</p>
            </div>
        </div>

        <div class="dynamic-card img-card-2">
            <img src="https://picsum.photos/600/600?random=2" alt="图2" class="card-media">
            <div class="hover-info">
                <h3>Main Feature</h3>
                <p>600 x 600</p>
            </div>
        </div>

        <div class="dynamic-card img-card-3">
            <img src="https://picsum.photos/300/280?random=3" alt="图3" class="card-media">
            <div class="hover-info">
                <h3>Top Stack</h3>
                <p>300 x 280</p>
            </div>
        </div>

        <div class="dynamic-card img-card-4">
            <img src="https://picsum.photos/300/280?random=4" alt="图4" class="card-media">
            <div class="hover-info">
                <h3>Bottom Stack</h3>
                <p>300 x 280</p>
            </div>
        </div>

        <div class="dynamic-card img-card-5">
            <img src="https://picsum.photos/600/280?random=5" alt="图5" class="card-media">
            <div class="hover-info">
                <h3>Wide Top</h3>
                <p>600 x 280</p>
            </div>
        </div>

        <div class="dynamic-card img-card-6">
            <img src="https://picsum.photos/280/280?random=6" alt="图6" class="card-media">
            <div class="hover-info">
                <h3>Square Block</h3>
                <p>280 x 280</p>
            </div>
        </div>

        <div class="dynamic-card img-card-7">
            <img src="https://picsum.photos/280/280?random=7" alt="图7" class="card-media">
            <div class="hover-info">
                <h3>Square Block</h3>
                <p>280 x 280</p>
            </div>
        </div>
    </div>

</body>
</html>
```

3\.热门产品

显示热门产品12个最多

显示更多热门产品按钮，当用户点了跳转到产品列表自动筛选热门标签的产品

4\.为什么选择我们

4\.1丰富的产品选择

利乐提供各种高品质的游乐设备，包括街机游戏、抓娃娃机、VR体验和儿童游乐设施，适合所有年龄段的人群。

4\.2自定义选项

我们提供灵活的定制服务，可根据您的具体需求量身定制产品，确保产品与您的娱乐场所完美契合。

4\.3卓越品质

我们的产品经过严格测试，并提供一年保修和终身维护，确保持久的可靠性和性能。

4\.5全球经验

凭借多年服务全球客户的经验，利乐已成为各个市场值得信赖的娱乐解决方案合作伙伴。

```TypeScript
"use client";

import * as React from "react";
import {
  Pyramid,
  Castle,
  Mountain,
  TowerControl,
  Building,
  Landmark,
} from "lucide-react";
import { cn } from "@/lib/utils"; 

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );
  
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};
    
    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "w-full max-w-6xl gap-2",
        "grid",
        "h-[600px] md:h-[500px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop 
          ? { gridTemplateRows: '1fr' }
          : { gridTemplateColumns: '1fr' }
        )
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm",
            "md:min-w-[80px]",
            "min-h-0 min-w-0"
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => handleInteraction(index)}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          <img
            src={item.imgSrc}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-300 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0 scale-110 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <article
            className="absolute inset-0 flex flex-col justify-end gap-2 p-4"
          >
            <h3 className="hidden origin-left rotate-90 text-sm font-light uppercase tracking-wider text-white/80 opacity-100 transition-all duration-300 ease-out md:block group-data-[active=true]:opacity-0">
              {item.title}
            </h3>

            <div className="text-white/90 opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100">
              {item.icon}
            </div>

            <h3 className="text-xl font-bold text-white opacity-0 transition-all duration-300 delay-150 ease-out group-data-[active=true]:opacity-100">
              {item.title}
            </h3>

            <p className="w-full max-w-xs text-sm text-white/80 opacity-0 transition-all duration-300 delay-225 ease-out group-data-[active=true]:opacity-100">
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";
```

5\.客户评论

按照这个代码块里的布局和内容，交互来设计，但是设计规范按照全局

```HTML
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>客户评论模块</title>
<style>
/* ==================== 全局重置与基础 ==================== */
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  background: #f0f2f5;
  color: #333;
  line-height: 1.6;
}

/* ==================== Block1 主容器 ==================== */
.block1 {
  width: 100%;
  max-width: 1400px;
  margin: 40px auto;
  display: flex;
  gap: 0;
  padding: 0 20px;
  min-height: 600px;
}

/* ==================== Block2 左侧 ==================== */
.block2 {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
}

/* ==================== Block4 客户信息+评论（上·大块） ==================== */
.block4 {
  flex: 3;
  display: flex;
  gap: 20px;
  background: #fff;
  border-radius: 0 0 16px 0;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  overflow: hidden;
}

/* Block6 客户信息区 */
.block6 {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}

/* 客户头像+名字+时间+地点 */
.customer-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.customer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid #e8e8e8;
}
.customer-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.customer-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}
.customer-meta {
  font-size: 12px;
  color: #999;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

/* 客户标签 */
.customer-tags {
  display: flex;
  gap: 6px;
  flex-wrap: nowrap;
  overflow: hidden;
}
.customer-tag {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* 评论内容 */
.customer-review {
  flex: 1;
  font-size: 14px;
  color: #555;
  line-height: 1.8;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.customer-review.expanded {
  -webkit-line-clamp: unset;
  display: block;
  z-index: 1000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.25);
  max-width: 500px;
  width: 90%;
  max-height: 70vh;
  overflow-y: auto;
  line-height: 2;
  cursor: default;
}
.review-overlay {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  z-index: 999;
}
.review-overlay.active { display: block; }

/* ==================== Block7 商品展示区 ==================== */
.block7 {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 0;
}
.product-images-wrapper {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-images {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
}
.product-img-item {
  width: 48%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-img {
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 12px;
  object-fit: cover;
  background: #f5f5f5;
  border: 1px solid #eee;
}
.product-img-title {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  text-align: center;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  min-height: 3em;
}
.product-title {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-top: 12px;
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.product-nav {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
.product-nav button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: #666;
}
.product-nav button:hover {
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
}

/* ==================== Block5 头像轮播区（下·小块） ==================== */
.block5 {
  flex: 1.2;
  background-size: cover;
  background-position: center;
  border-radius: 16px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: #fff;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  min-height: 180px;
}
.block5::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 0;
}
.block5 > * { position: relative; z-index: 1; }

.block5-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

/* 头像轮播容器 */
.avatar-carousel {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  overflow: hidden;
  padding: 0 20px;
  height: 70px;
  position: relative;
}
.avatar-track {
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}
.avatar-item {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: visible;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.5;
  transform: scale(0.8);
  filter: grayscale(60%);
  position: relative;
}
.avatar-item.active {
  opacity: 1;
  transform: scale(1.15);
  filter: grayscale(0%);
}
.avatar-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  position: relative;
  z-index: 1;
}

/* 七彩描边生长动画 — 从无到有 */
.avatar-item.active::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 50%;
  background: conic-gradient(
    #ff0000, #ff7700, #ffff00, #00ff00,
    #00ffff, #0000ff, #8b00ff, #ff0000
  );
  z-index: 0;
  animation: rainbowSpin 2s linear infinite, rainbowGrowIn 4s ease-in-out infinite;
}
@keyframes rainbowSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes rainbowGrowIn {
  0%   { top: 0; left: 0; right: 0; bottom: 0; opacity: 0; }
  25%  { top: -4px; left: -4px; right: -4px; bottom: -4px; opacity: 1; }
  75%  { top: -4px; left: -4px; right: -4px; bottom: -4px; opacity: 1; }
  100% { top: 0; left: 0; right: 0; bottom: 0; opacity: 0; }
}

.block5-stats {
  margin-top: 14px;
  font-size: 13px;
  opacity: 0.9;
  text-align: center;
}
.block5-stats .amount {
  font-size: 22px;
  font-weight: 700;
  color: #ffd700;
  display: block;
  margin-top: 2px;
}

/* ==================== Block3 视频播放器 ==================== */
.block3 {
  width: 380px;
  flex-shrink: 0;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
}
.video-container {
  flex: 1;
  position: relative;
  background: #111;
  aspect-ratio: 9/16;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}
.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-poster {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.video-poster.hidden { display: none; }
.play-btn {
  width: 64px;
  height: 64px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.3);
  transition: all 0.3s;
}
.play-btn:hover {
  background: rgba(255,255,255,0.35);
  transform: scale(1.1);
}
.play-btn svg {
  width: 28px;
  height: 28px;
  fill: #fff;
  margin-left: 4px;
}
.play-btn.paused svg {
  margin-left: 0;
}

/* 视频时间轴 */
.video-timeline {
  padding: 10px 14px;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  gap: 10px;
}
.video-time {
  font-size: 12px;
  color: #aaa;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  min-width: 40px;
}
.timeline-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  background: #333;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  position: relative;
}
.timeline-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  background: #1890ff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(24,144,255,0.5);
  transition: transform 0.15s;
}
.timeline-slider::-webkit-slider-thumb:hover {
  transform: scale(1.3);
}
.timeline-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: #1890ff;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

/* ==================== 响应式 ==================== */
@media (max-width: 1024px) {
  .block1 {
    flex-direction: column;
  }
  .block3 {
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
  }
  .block4 {
    flex-direction: column;
  }
}
@media (max-width: 600px) {
  .block1 { padding: 0 10px; }
  .block4 { padding: 16px; }
  .block5 { min-height: 150px; }
  .avatar-item { width: 42px; height: 42px; }
  .block5-title { font-size: 14px; }
}

/* ==================== 辅助动画 ==================== */
.fade-in {
  animation: fadeIn 0.5s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
</head>
<body>

<!-- ==================== 主容器 Block1 ==================== -->
<div class="block1">

  <!-- ==================== Block2 左侧区域 ==================== -->
  <div class="block2">

    <!-- ===== Block5 头像轮播区（上·小块） ===== -->
    <div class="block5" id="block5">
      <div class="block5-title">感谢各位客户的信任</div>
      <div class="avatar-carousel" id="avatarCarousel">
        <!-- 头像由 JS 动态生成 -->
      </div>
      <div class="block5-stats">
        总计采购金额
        <span class="amount" id="totalAmount">¥ 128,600</span>
      </div>
    </div>

    <!-- ===== Block4 客户信息+评论（下·大块） ===== -->
    <div class="block4">
      <!-- Block6 客户信息 -->
      <div class="block6">
        <!-- 头像 + 名字/时间/地点 -->
        <div class="customer-header">
          <img class="customer-avatar" id="customerAvatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="客户头像">
          <div class="customer-info">
            <span class="customer-name" id="customerName">张先生</span>
            <div class="customer-meta">
              <span id="customerTime">2025年12月 · 采购3次</span>
              <span id="customerLocation">📍 上海市浦东新区</span>
            </div>
          </div>
        </div>
        <!-- 标签 -->
        <div class="customer-tags" id="customerTags">
          <span class="customer-tag" style="background:#e6f7ff;color:#1890ff;">VIP客户</span>
          <span class="customer-tag" style="background:#f6ffed;color:#52c41a;">复购率高</span>
          <span class="customer-tag" style="background:#fff7e6;color:#fa8c16;">大额采购</span>
          <span class="customer-tag" style="background:#fff1f0;color:#f5222d;">急速交付</span>
          <span class="customer-tag" style="background:#f9f0ff;color:#722ed1;">定制需求</span>
        </div>
        <!-- 评论 -->
        <div class="customer-review" id="customerReview">
          非常满意这次的合作体验！从咨询到下单再到收货，整个过程非常顺畅。产品质量超出预期，包装也很精美。客服团队的响应速度很快，有问题都能及时解决。特别是物流速度，比预期提前了两天就收到了。已经推荐给了身边的朋友和合作伙伴，下次还会继续回购！
        </div>
      </div>

      <!-- Block7 商品展示 -->
      <div class="block7">
        <div class="product-images-wrapper">
          <div class="product-images" id="productImages">
            <div class="product-img-item">
              <img class="product-img fade-in" src="https://via.placeholder.com/300x400/1890ff/fff?text=商品A" alt="商品">
              <div class="product-img-title" id="productTitle1">高端商务礼盒套装 精美包装设计</div>
            </div>
            <div class="product-img-item">
              <img class="product-img fade-in" src="https://via.placeholder.com/300x400/52c41a/fff?text=商品B" alt="商品">
              <div class="product-img-title" id="productTitle2">商务礼盒套装 限量版</div>
            </div>
          </div>
        </div>
        <div class="product-title" id="productTitle">高端商务礼盒套装</div>
        <div class="product-nav">
          <button onclick="switchProduct(-1)">◀</button>
          <button onclick="switchProduct(1)">▶</button>
        </div>
      </div>
    </div>

  </div>

  <!-- ==================== Block3 视频播放器 ==================== -->
  <div class="block3">
    <div class="video-container" id="videoContainer" onclick="togglePlay()">
      <video id="videoPlayer" preload="metadata" loop>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        您的浏览器不支持视频播放
      </video>
      <div class="video-poster" id="videoPoster">
        <div class="play-btn" id="playBtn">
          <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
        </div>
      </div>
    </div>
    <div class="video-timeline">
      <span class="video-time" id="currentTime">0:00</span>
      <input type="range" class="timeline-slider" id="timelineSlider" min="0" max="100" value="0" step="0.1">
      <span class="video-time" id="totalTime">0:00</span>
    </div>
  </div>

</div>

<!-- 评论弹窗遮罩 -->
<div class="review-overlay" id="reviewOverlay" onclick="closeReview()"></div>

<script>
// ==================== 模拟数据 ====================
const customers = [
  {
    name: '张先生',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    time: '2025年12月 · 采购3次',
    location: '📍 上海市浦东新区',
    tags: [
      { text: 'VIP客户', bg: '#e6f7ff', color: '#1890ff' },
      { text: '复购率高', bg: '#f6ffed', color: '#52c41a' },
      { text: '大额采购', bg: '#fff7e6', color: '#fa8c16' },
      { text: '急速交付', bg: '#fff1f0', color: '#f5222d' },
      { text: '定制需求', bg: '#f9f0ff', color: '#722ed1' }
    ],
    review: '非常满意这次的合作体验！从咨询到下单再到收货，整个过程非常顺畅。产品质量超出预期，包装也很精美。客服团队的响应速度很快，有问题都能及时解决。特别是物流速度，比预期提前了两天就收到了。已经推荐给了身边的朋友和合作伙伴，下次还会继续回购！',
    amount: '¥ 128,600',
    products: [
      { img: 'https://via.placeholder.com/300x400/1890ff/fff?text=商品A', title: '高端商务礼盒套装 精美包装设计 高端大气上档次' },
      { img: 'https://via.placeholder.com/300x400/52c41a/fff?text=商品B', title: '商务礼盒套装 限量版送礼首选' }
    ]
  },
  {
    name: '李女士',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    time: '2025年11月 · 采购5次',
    location: '📍 北京市朝阳区',
    tags: [
      { text: '老客户', bg: '#e6fffb', color: '#13c2c2' },
      { text: '口碑推荐', bg: '#fff0f6', color: '#eb2f96' },
      { text: '批量采购', bg: '#fcffe6', color: '#a0d911' }
    ],
    review: '已经是第五次在这里采购了，每次都很满意！产品品质稳定，价格也很合理。这次定制的批量订单，从设计到生产只用了不到一周时间，效率真的很高。包装也很用心，每一个细节都考虑到了。强烈推荐给有采购需求的朋友们！',
    amount: '¥ 256,800',
    products: [
      { img: 'https://via.placeholder.com/300x400/722ed1/fff?text=商品C', title: '定制办公用品套装 企业采购首选品质保障' },
      { img: 'https://via.placeholder.com/300x400/eb2f96/fff?text=商品D', title: '办公用品套装 经济实惠' }
    ]
  },
  {
    name: '王经理',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Garfield',
    time: '2025年10月 · 采购2次',
    location: '📍 深圳市南山区',
    tags: [
      { text: '企业客户', bg: '#e6f7ff', color: '#096dd9' },
      { text: '技术合作', bg: '#f0f5ff', color: '#2f54eb' },
      { text: '长期合作', bg: '#fffbe6', color: '#d48806' }
    ],
    review: '作为企业采购负责人，对供应商的要求比较高。这家公司在产品质量、交付时间和售后服务方面都表现得非常出色。特别是他们的定制化服务能力，能够根据我们的具体需求提供专业的解决方案。合作两年来，从未出现过质量问题，值得信赖的合作伙伴。',
    amount: '¥ 892,000',
    products: [
      { img: 'https://via.placeholder.com/300x400/fa8c16/fff?text=商品E', title: '企业定制礼品 高端商务馈赠佳品' },
      { img: 'https://via.placeholder.com/300x400/13c2c2/fff?text=商品F', title: '定制礼品 独家设计' }
    ]
  },
  {
    name: '赵总',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow',
    time: '2025年9月 · 采购8次',
    location: '📍 广州市天河区',
    tags: [
      { text: '超级VIP', bg: '#fff1f0', color: '#cf1322' },
      { text: '年度合作', bg: '#f9f0ff', color: '#531dab' }
    ],
    review: '合作了快一年了，每次的采购体验都非常好。产品种类丰富，能够满足我们不同场景的需求。价格透明，没有隐形消费。物流速度快，包装严实。客服专业且耐心，有任何问题都能第一时间得到回复和处理。真心推荐！',
    amount: '¥ 1,560,000',
    products: [
      { img: 'https://via.placeholder.com/300x400/f5222d/fff?text=商品G', title: '年度采购大礼包 超值组合限时优惠' },
      { img: 'https://via.placeholder.com/300x400/2f54eb/fff?text=商品H', title: '采购大礼包 精美套装' }
    ]
  },
  {
    name: '陈小姐',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily',
    time: '2025年8月 · 采购1次',
    location: '📍 杭州市西湖区',
    tags: [
      { text: '新客户', bg: '#e6fffb', color: '#006d75' },
      { text: '设计师', bg: '#fff0f6', color: '#c41d7f' },
      { text: '精品控', bg: '#fcffe6', color: '#389e0d' },
      { text: '社交媒体', bg: '#e6f7ff', color: '#0050b3' }
    ],
    review: '第一次购买就被惊艳到了！产品的设计感很强，做工精细，完全超出了我的预期。作为一个对品质要求很高的人，我真的很挑剔，但这次真的挑不出毛病。客服小姐姐态度特别好，耐心解答了我所有的问题。已经收藏店铺，准备下次再入手其他产品。',
    amount: '¥ 36,500',
    products: [
      { img: 'https://via.placeholder.com/300x400/c41d7f/fff?text=商品I', title: '设计师精选套装 时尚潮流之选独特风格' },
      { img: 'https://via.placeholder.com/300x400/389e0d/fff?text=商品J', title: '精选套装 品质保证' }
    ]
  },
  {
    name: '刘总监',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo',
    time: '2025年7月 · 采购6次',
    location: '📍 成都市武侯区',
    tags: [
      { text: '战略客户', bg: '#e6f7ff', color: '#003a8c' },
      { text: '批量定制', bg: '#f0f5ff', color: '#2f54eb' }
    ],
    review: '我们公司已经和这家供应商建立了长期战略合作关系。每次的定制需求都能被精准理解和高效执行。产品质量一直保持在很高的水准，价格也很有竞争力。特别是他们的售后团队，反应迅速，处理问题专业到位。',
    amount: '¥ 2,180,000',
    products: [
      { img: 'https://via.placeholder.com/300x400/597ef7/fff?text=商品K', title: '战略定制产品 企业专属高端定制方案' },
      { img: 'https://via.placeholder.com/300x400/36cfc9/fff?text=商品L', title: '定制方案 专属设计' }
    ]
  },
  {
    name: '黄主任',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
    time: '2025年6月 · 采购4次',
    location: '📍 武汉市洪山区',
    tags: [
      { text: '政府客户', bg: '#f6ffed', color: '#237804' },
      { text: '合规采购', bg: '#fcffe6', color: '#389e0d' },
      { text: '批量订单', bg: '#e6f7ff', color: '#096dd9' }
    ],
    review: '作为政府部门的采购负责人，对供应商的资质和合规性要求非常严格。这家公司完全符合我们的采购标准，产品质量可靠，价格合理，交付及时。多次合作下来，从未出现过任何问题，是值得信赖的优质供应商。',
    amount: '¥ 756,000',
    products: [
      { img: 'https://via.placeholder.com/300x400/237804/fff?text=商品M', title: '政企采购专用设备 高品质合规产品' },
      { img: 'https://via.placeholder.com/300x400/096dd9/fff?text=商品N', title: '专用设备 合规保障' }
    ]
  },
  {
    name: '周老板',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Buddy',
    time: '2025年5月 · 采购12次',
    location: '📍 温州市鹿城区',
    tags: [
      { text: '批发商', bg: '#fff7e6', color: '#d46b08' },
      { text: '高频复购', bg: '#fff1f0', color: '#cf1322' },
      { text: '大客户', bg: '#f9f0ff', color: '#531dab' }
    ],
    review: '我是做批发业务的，对产品的性价比要求很高。这家供应商的产品质量稳定，价格有优势，每次进货都很放心。物流也很快，基本上下单后两三天就能到货。合作了一年多，已经是我的主要供货渠道了。',
    amount: '¥ 3,420,000',
    products: [
      { img: 'https://via.placeholder.com/300x400/d46b08/fff?text=商品O', title: '批发热销爆款 高利润畅销产品系列' },
      { img: 'https://via.placeholder.com/300x400/cf1322/fff?text=商品P', title: '热销爆款 利润保障' }
    ]
  },
  {
    name: '吴老师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi',
    time: '2025年4月 · 采购2次',
    location: '📍 南京市鼓楼区',
    tags: [
      { text: '教育行业', bg: '#e6fffb', color: '#006d75' },
      { text: '校园采购', bg: '#f6ffed', color: '#237804' }
    ],
    review: '学校采购需要兼顾品质和预算。这家供应商提供了很好的解决方案，产品性价比高，而且可以根据学校的需求进行定制。学生们对收到的产品都很满意，老师们也觉得质量不错。下次还会继续合作。',
    amount: '¥ 89,000',
    products: [
      { img: 'https://via.placeholder.com/300x400/006d75/fff?text=商品Q', title: '教育专用产品 校园采购优质选择' },
      { img: 'https://via.placeholder.com/300x400/237804/fff?text=商品R', title: '专用产品 校园优选' }
    ]
  },
  {
    name: '孙工程师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
    time: '2025年3月 · 采购3次',
    location: '📍 西安市雁塔区',
    tags: [
      { text: '技术采购', bg: '#f0f5ff', color: '#1d39c4' },
      { text: '工程师', bg: '#e6f7ff', color: '#003a8c' },
      { text: '精准需求', bg: '#f9f0ff', color: '#391085' }
    ],
    review: '作为工程师，我对产品的技术参数和精度要求很高。这家供应商的产品完全符合我们的技术标准，而且他们的技术团队能够提供专业的选型建议。售后服务也很到位，有任何技术问题都能及时得到解决。',
    amount: '¥ 425,000',
    products: [
      { img: 'https://via.placeholder.com/300x400/1d39c4/fff?text=商品S', title: '精密仪器设备 工程师推荐高精度产品' },
      { img: 'https://via.placeholder.com/300x400/391085/fff?text=商品T', title: '仪器设备 精密制造' }
    ]
  },
  {
    name: '郑设计师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
    time: '2025年2月 · 采购1次',
    location: '📍 厦门市思明区',
    tags: [
      { text: '创意设计', bg: '#fff0f6', color: '#9e1068' },
      { text: '美学追求', bg: '#f9f0ff', color: '#531dab' },
      { text: '首次合作', bg: '#e6fffb', color: '#08979c' }
    ],
    review: '作为一个设计师，我对产品的外观和质感非常挑剔。这次采购的产品在设计感和做工方面都让我非常惊喜，完全超出了我的预期。色彩还原度高，材质手感好，包装也很精美。已经推荐给了我的设计圈朋友们！',
    amount: '¥ 52,800',
    products: [
      { img: 'https://via.placeholder.com/300x400/9e1068/fff?text=商品U', title: '设计师联名款 限量艺术创意产品' },
      { img: 'https://via.placeholder.com/300x400/08979c/fff?text=商品V', title: '联名款 艺术创意' }
    ]
  }
];

let currentCustomerIndex = 0;
let currentProductIndex = 0;
let avatarInterval = null;
const SWITCH_INTERVAL = 4000;
const CENTER_INDEX = 5; // 固定第6个位置（索引5）为当前显示位置

// ==================== 头像轮播 ====================
function initAvatarCarousel() {
  const carousel = document.getElementById('avatarCarousel');
  carousel.innerHTML = '';
  // 创建 track 容器
  const track = document.createElement('div');
  track.className = 'avatar-track';
  track.id = 'avatarTrack';
  
  // 首次加载：当前头像 = 总数/2（取整）
  currentCustomerIndex = Math.floor(customers.length / 2);
  
  // 渲染头像，按顺序排列
  renderAvatars(track);
  
  carousel.appendChild(track);
  updateAvatarPosition();
  updateCustomerDisplay();
  updateAvatarStyles();
  updateBlock5Background();
  startAutoSwitch();
}

function renderAvatars(track) {
  track.innerHTML = '';
  // 按当前顺序渲染所有头像
  customers.forEach((c, i) => {
    const item = document.createElement('div');
    item.className = 'avatar-item' + (i === currentCustomerIndex ? ' active' : '');
    item.innerHTML = `<img src="${c.avatar}" alt="${c.name}">`;
    item.onclick = () => switchToCustomer(i);
    track.appendChild(item);
  });
}

function updateAvatarPosition() {
  const track = document.getElementById('avatarTrack');
  if (!track) return;
  const carousel = document.getElementById('avatarCarousel');
  const containerWidth = carousel.clientWidth;
  const itemWidth = 52 + 10; // 头像宽 + gap
  // 当前头像居中：偏移量 = 容器中心 - 当前头像中心
  const offset = containerWidth / 2 - (currentCustomerIndex * itemWidth + itemWidth / 2);
  track.style.transform = `translateX(${offset}px)`;
}

function switchToCustomer(index) {
  // 计算需要移动多少步
  const diff = index - currentCustomerIndex;
  if (diff > 0) {
    // 向右移动：把前面的移到后面
    for (let i = 0; i < diff; i++) {
      customers.push(customers.shift());
    }
  } else if (diff < 0) {
    // 向左移动：把后面的移到前面
    for (let i = 0; i < -diff; i++) {
      customers.unshift(customers.pop());
    }
  }
  currentProductIndex = 0;
  
  // 重新渲染
  const track = document.getElementById('avatarTrack');
  if (track) renderAvatars(track);
  
  updateAvatarPosition();
  updateCustomerDisplay();
  updateAvatarStyles();
  updateBlock5Background();
  resetAutoSwitch();
}

function updateAvatarStyles() {
  const items = document.querySelectorAll('.avatar-item');
  items.forEach((item, i) => {
    item.classList.toggle('active', i === currentCustomerIndex);
  });
}

function updateBlock5Background() {
  const block5 = document.getElementById('block5');
  block5.style.backgroundImage = `url(${customers[currentCustomerIndex].avatar})`;
  block5.style.backgroundSize = 'cover';
  block5.style.backgroundPosition = 'center';
}

function startAutoSwitch() {
  avatarInterval = setInterval(() => {
    // 向右移动一位：第一个移到最后
    customers.push(customers.shift());
    currentProductIndex = 0;
    
    // 重新渲染
    const track = document.getElementById('avatarTrack');
    if (track) renderAvatars(track);
    
    updateAvatarPosition();
    updateCustomerDisplay();
    updateAvatarStyles();
    updateBlock5Background();
  }, SWITCH_INTERVAL);
}

function resetAutoSwitch() {
  clearInterval(avatarInterval);
  startAutoSwitch();
}

// 窗口大小变化时重新计算位置
window.addEventListener('resize', updateAvatarPosition);

// ==================== 更新客户信息显示 ====================
function updateCustomerDisplay() {
  const c = customers[currentCustomerIndex];
  document.getElementById('customerAvatar').src = c.avatar;
  document.getElementById('customerName').textContent = c.name;
  document.getElementById('customerTime').textContent = c.time;
  document.getElementById('customerLocation').textContent = c.location;
  document.getElementById('totalAmount').textContent = c.amount;
  document.getElementById('customerReview').textContent = c.review;
  document.getElementById('customerReview').classList.remove('expanded');
  document.getElementById('reviewOverlay').classList.remove('active');

  // 更新标签
  const tagsContainer = document.getElementById('customerTags');
  tagsContainer.innerHTML = '';
  c.tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'customer-tag';
    span.style.background = tag.bg;
    span.style.color = tag.color;
    span.textContent = tag.text;
    tagsContainer.appendChild(span);
  });

  // 更新商品
  updateProductDisplay();
}

// ==================== 商品切换 ====================
function updateProductDisplay() {
  const c = customers[currentCustomerIndex];
  const products = c.products;
  const imgs = document.getElementById('productImages');

  const idx1 = currentProductIndex % products.length;
  const idx2 = (currentProductIndex + 1) % products.length;

  imgs.innerHTML = `
    <div class="product-img-item">
      <img class="product-img fade-in" src="${products[idx1].img}" alt="商品">
      <div class="product-img-title">${products[idx1].title}</div>
    </div>
    <div class="product-img-item">
      <img class="product-img fade-in" src="${products[idx2].img}" alt="商品">
      <div class="product-img-title">${products[idx2].title}</div>
    </div>
  `;
}

function switchProduct(dir) {
  const c = customers[currentCustomerIndex];
  const total = c.products.length;
  currentProductIndex = (currentProductIndex + dir + total) % total;
  updateProductDisplay();
}

// ==================== 评论弹窗 ====================
const reviewEl = document.getElementById('customerReview');
const overlayEl = document.getElementById('reviewOverlay');

reviewEl.addEventListener('mouseenter', function() {
  if (this.scrollHeight > this.clientHeight) {
    this.classList.add('expanded');
    overlayEl.classList.add('active');
  }
});

function closeReview() {
  reviewEl.classList.remove('expanded');
  overlayEl.classList.remove('active');
}

// 点击弹窗外或滚动关闭
document.addEventListener('scroll', closeReview);
reviewEl.addEventListener('click', function(e) {
  if (this.classList.contains('expanded')) {
    closeReview();
  }
});

// ==================== 视频播放器 ====================
const video = document.getElementById('videoPlayer');
const poster = document.getElementById('videoPoster');
const playBtn = document.getElementById('playBtn');
const slider = document.getElementById('timelineSlider');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
let isPlaying = false;

video.addEventListener('loadedmetadata', () => {
  totalTimeEl.textContent = formatTime(video.duration);
  slider.max = video.duration;
});

function togglePlay() {
  if (isPlaying) {
    video.pause();
    poster.classList.remove('hidden');
    playBtn.innerHTML = '<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>';
    isPlaying = false;
  } else {
    poster.classList.add('hidden');
    video.play();
    playBtn.innerHTML = '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    isPlaying = true;
  }
}

video.addEventListener('timeupdate', () => {
  if (!slider._dragging) {
    slider.value = video.currentTime;
  }
  currentTimeEl.textContent = formatTime(video.currentTime);
});

slider.addEventListener('input', () => {
  video.currentTime = slider.value;
  currentTimeEl.textContent = formatTime(slider.value);
});

// 拖动支持
slider.addEventListener('mousedown', () => { slider._dragging = true; });
slider.addEventListener('touchstart', () => { slider._dragging = true; });
document.addEventListener('mouseup', () => { slider._dragging = false; });
document.addEventListener('touchend', () => { slider._dragging = false; });

function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}

// ==================== 初始化 ====================
initAvatarCarousel();
</script>
</body>
</html>

```

6\.合作过的客户

文案\+图片

```JavaScript
"use client"

import { useState, useRef } from "react"

export const WaitlistHero = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle") // 'idle' | 'loading' | 'success'
  const canvasRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    // Simulate API delay
    setTimeout(() => {
      setStatus("success")
      setEmail("")
      fireConfetti()
    }, 1500)
  }

  // --- Confetti Logic ---
  const fireConfetti = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const particles = []
    const colors = ["#0079da", "#10b981", "#fbbf24", "#f472b6", "#fff"]

    // Resize canvas to cover the button area mostly
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const createParticle = () => {
      return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12, // Random spread X
        vy: (Math.random() - 2) * 10, // Upward velocity
        life: 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 2,
      }
    }

    // Create batch of particles
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle())
    }

    const animate = () => {
      if (particles.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.5 // Gravity
        p.life -= 2

        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.life / 100)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        if (p.life <= 0) {
          particles.splice(i, 1)
          i--
        }
      }

      requestAnimationFrame(animate)
    }

    animate()
  }

  // Color tokens
  const colors = {
    textMain: "#ffffff",
    textSecondary: "#94a3b8",
    bluePrimary: "#0079da",
    success: "#10b981", // emerald-500
    inputBg: "#27272a",
    baseBg: "#09090b",
    inputShadow: "rgba(255, 255, 255, 0.1)",
  }

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center">
      {/* Animation Styles */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 60s linear infinite;
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes success-pulse {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes success-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 60px rgba(16, 185, 129, 0.8), 0 0 100px rgba(16, 185, 129, 0.4); }
        }
        @keyframes checkmark-draw {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes celebration-ring {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        .animate-success-pulse {
          animation: success-pulse 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-success-glow {
          animation: success-glow 2s ease-in-out infinite;
        }
        .animate-checkmark {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: checkmark-draw 0.4s ease-out 0.3s forwards;
        }
        .animate-ring {
          animation: celebration-ring 0.8s ease-out forwards;
        }
      `}</style>

      {/* Main Container */}
      <div
        className="relative w-full h-screen overflow-hidden shadow-2xl"
        style={{
          backgroundColor: colors.baseBg,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Background Decorative Layer */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            perspective: "1200px",
            transform: "perspective(1200px) rotateX(15deg)",
            transformOrigin: "center bottom",
            opacity: 1,
          }}
        >
          {/* Image 3 (Back) - spins clockwise */}
          <div className="absolute inset-0 animate-spin-slow">
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: "2000px",
                height: "2000px",
                transform: "translate(-50%, -50%) rotate(279.05deg)",
                zIndex: 0,
              }}
            >
              <img
                src="https://framerusercontent.com/images/oqZEqzDEgSLygmUDuZAYNh2XQ9U.png?scale-down-to=2048"
                alt=""
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          </div>

          {/* Image 2 (Middle) - spins counter-clockwise */}
          <div className="absolute inset-0 animate-spin-slow-reverse">
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: "1000px",
                height: "1000px",
                transform: "translate(-50%, -50%) rotate(304.42deg)",
                zIndex: 1,
              }}
            >
              <img
                src="https://framerusercontent.com/images/UbucGYsHDAUHfaGZNjwyCzViw8.png?scale-down-to=1024"
                alt=""
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          </div>

          {/* Image 1 (Front) - spins clockwise */}
          <div className="absolute inset-0 animate-spin-slow">
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: "800px",
                height: "800px",
                transform: "translate(-50%, -50%) rotate(48.33deg)",
                zIndex: 2,
              }}
            >
              <img
                src="https://framerusercontent.com/images/Ans5PAxtJfg3CwxlrPMSshx2Pqc.png"
                alt="App Icon"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${colors.baseBg} 10%, rgba(9, 9, 11, 0.8) 40%, transparent 100%)`,
          }}
        />

        {/* Content Container */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-end pb-24 gap-6">
          <div className="w-16 h-16 rounded-2xl shadow-lg overflow-hidden mb-2 ring-1 ring-white/10">
            <img src="https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?q=80&w=1696&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="App Icon" className="w-full h-full object-cover" />

          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-center tracking-tight" style={{ color: colors.textMain }}>
            Take a screenshot.
          </h1>

          <p className="text-lg font-medium" style={{ color: colors.textSecondary }}>
            Save anything with a screenshot.
          </p>

          {/* Form / Success Container */}
          <div className="w-full max-w-md px-4 mt-4 h-[60px] relative perspective-1000">
            {/* Confetti Canvas - overlays everything but ignores clicks */}
            <canvas
              ref={canvasRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-50"
            />

            {/* SUCCESS STATE */}
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                status === "success"
                  ? "opacity-100 scale-100 rotate-x-0 animate-success-pulse animate-success-glow"
                  : "opacity-0 scale-95 -rotate-x-90 pointer-events-none"
              }`}
              style={{ backgroundColor: colors.success }}
            >
              {/* Celebration rings */}
              {status === "success" && (
                <>
                  <div
                    className="absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-emerald-400 animate-ring"
                    style={{ animationDelay: "0s" }}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-emerald-300 animate-ring"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-emerald-200 animate-ring"
                    style={{ animationDelay: "0.3s" }}
                  />
                </>
              )}
              <div
                className={`flex items-center gap-2 text-white font-semibold text-lg ${status === "success" ? "animate-bounce-in" : ""}`}
              >
                <div className="bg-white/20 p-1 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      className={status === "success" ? "animate-checkmark" : ""}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>You're on the list!</span>
              </div>
            </div>

            {/* FORM STATE */}
            <form
              onSubmit={handleSubmit}
              className={`relative w-full h-full group transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                status === "success"
                  ? "opacity-0 scale-95 rotate-x-90 pointer-events-none"
                  : "opacity-100 scale-100 rotate-x-0"
              }`}
            >
              <input
                type="email"
                required
                placeholder="name@email.com"
                value={email}
                disabled={status === "loading"}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[60px] pl-6 pr-[150px] rounded-full outline-none transition-all duration-200 placeholder-zinc-500 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: colors.inputBg,
                  color: colors.textMain,
                  boxShadow: `inset 0 0 0 1px ${colors.inputShadow}`,
                }}
              />

              <div className="absolute top-[6px] right-[6px] bottom-[6px]">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-full px-6 rounded-full font-medium text-white transition-all active:scale-95 hover:brightness-110 disabled:hover:brightness-100 disabled:active:scale-100 disabled:cursor-wait flex items-center justify-center min-w-[130px]"
                  style={{ backgroundColor: colors.bluePrimary }}
                >
                  {status === "loading" ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Join waitlist"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
```

7\.场地设计展示

图片\+标题\+描述



文案加图片



8\.我们的产品适合什么地方

9\.采购流程

10\.表单

11\.页脚



```JavaScript
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button-1';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

const alertVariants = cva('flex items-stretch w-full gap-2 group-[.toaster]:w-(--width)', {
  variants: {
    variant: {
      secondary: '',
      primary: '',
      destructive: '',
      success: '',
      info: '',
      mono: '',
      warning: '',
    },
    icon: {
      primary: '',
      destructive: '',
      success: '',
      info: '',
      warning: '',
    },
    appearance: {
      solid: '',
      outline: '',
      light: '',
      stroke: 'text-foreground',
    },
    size: {
      lg: 'rounded-lg p-4 gap-3 text-base [&>[data-slot=alert-icon]>svg]:size-6 *:data-slot=alert-icon:mt-0.5 [&_[data-slot=alert-close]]:mt-1',
      md: 'rounded-lg p-3.5 gap-2.5 text-sm [&>[data-slot=alert-icon]>svg]:size-5 *:data-slot=alert-icon:mt-0 [&_[data-slot=alert-close]]:mt-0.5',
      sm: 'rounded-md px-3 py-2.5 gap-2 text-xs [&>[data-slot=alert-icon]>svg]:size-4 *:data-alert-icon:mt-0.5 [&_[data-slot=alert-close]]:mt-0.25 [&_[data-slot=alert-close]_svg]:size-3.5',
    },
  },
  compoundVariants: [
    /* Solid */
    {
      variant: 'secondary',
      appearance: 'solid',
      className: 'bg-muted text-foreground',
    },
    {
      variant: 'primary',
      appearance: 'solid',
      className: 'bg-primary text-primary-foreground',
    },
    {
      variant: 'destructive',
      appearance: 'solid',
      className: 'bg-destructive text-destructive-foreground',
    },
    {
      variant: 'success',
      appearance: 'solid',
      className:
        'bg-[var(--color-success,var(--color-green-500))] text-[var(--color-success-foreground,var(--color-white))]',
    },
    {
      variant: 'info',
      appearance: 'solid',
      className:
        'bg-[var(--color-info,var(--color-violet-600))] text-[var(--color-info-foreground,var(--color-white))]',
    },
    {
      variant: 'warning',
      appearance: 'solid',
      className:
        'bg-[var(--color-warning,var(--color-yellow-500))] text-[var(--color-warning-foreground,var(--color-white))]',
    },
    {
      variant: 'mono',
      appearance: 'solid',
      className: 'bg-zinc-950 text-white dark:bg-zinc-300 dark:text-black *:data-slot-[alert=close]:text-white',
    },

    /* Outline */
    {
      variant: 'secondary',
      appearance: 'outline',
      className: 'border border-border bg-background text-foreground [&_[data-slot=alert-close]]:text-foreground',
    },
    {
      variant: 'primary',
      appearance: 'outline',
      className: 'border border-border bg-background text-primary [&_[data-slot=alert-close]]:text-foreground',
    },
    {
      variant: 'destructive',
      appearance: 'outline',
      className: 'border border-border bg-background text-destructive [&_[data-slot=alert-close]]:text-foreground',
    },
    {
      variant: 'success',
      appearance: 'outline',
      className:
        'border border-border bg-background text-[var(--color-success,var(--color-green-500))] [&_[data-slot=alert-close]]:text-foreground',
    },
    {
      variant: 'info',
      appearance: 'outline',
      className:
        'border border-border bg-background text-[var(--color-info,var(--color-violet-600))] [&_[data-slot=alert-close]]:text-foreground',
    },
    {
      variant: 'warning',
      appearance: 'outline',
      className:
        'border border-border bg-background text-[var(--color-warning,var(--color-yellow-500))] [&_[data-slot=alert-close]]:text-foreground',
    },
    {
      variant: 'mono',
      appearance: 'outline',
      className: 'border border-border bg-background text-foreground [&_[data-slot=alert-close]]:text-foreground',
    },

    /* Light */
    {
      variant: 'secondary',
      appearance: 'light',
      className: 'bg-muted border border-border text-foreground',
    },
    {
      variant: 'primary',
      appearance: 'light',
      className:
        'text-foreground bg-[var(--color-primary-soft,var(--color-blue-50))] border border-[var(--color-primary-alpha,var(--color-blue-100))] [&_[data-slot=alert-icon]]:text-primary dark:bg-[var(--color-primary-soft,var(--color-blue-950))] dark:border-[var(--color-primary-alpha,var(--color-blue-900))]',
    },
    {
      variant: 'destructive',
      appearance: 'light',
      className:
        'bg-[var(--color-destructive-soft,var(--color-red-50))] border border-[var(--color-destructive-alpha,var(--color-red-100))] text-foreground [&_[data-slot=alert-icon]]:text-destructive dark:bg-[var(--color-destructive-soft,var(--color-red-950))] dark:border-[var(--color-destructive-alpha,var(--color-red-900))] ',
    },
    {
      variant: 'success',
      appearance: 'light',
      className:
        'bg-[var(--color-success-soft,var(--color-green-50))] border border-[var(--color-success-alpha,var(--color-green-200))] text-foreground [&_[data-slot=alert-icon]]:text-[var(--color-success-foreground,var(--color-green-600))] dark:bg-[var(--color-success-soft,var(--color-green-950))] dark:border-[var(--color-success-alpha,var(--color-green-900))]',
    },
    {
      variant: 'info',
      appearance: 'light',
      className:
        'bg-[var(--color-info-soft,var(--color-violet-50))] border border-[var(--color-info-alpha,var(--color-violet-100))] text-foreground [&_[data-slot=alert-icon]]:text-[var(--color-info-foreground,var(--color-violet-600))] dark:bg-[var(--color-info-soft,var(--color-violet-950))] dark:border-[var(--color-info-alpha,var(--color-violet-900))]',
    },
    {
      variant: 'warning',
      appearance: 'light',
      className:
        'bg-[var(--color-warning-soft,var(--color-yellow-50))] border border-[var(--color-warning-alpha,var(--color-yellow-200))] text-foreground [&_[data-slot=alert-icon]]:text-[var(--color-warning-foreground,var(--color-yellow-600))] dark:bg-[var(--color-warning-soft,var(--color-yellow-950))] dark:border-[var(--color-warning-alpha,var(--color-yellow-900))]',
    },

    /* Mono */
    {
      variant: 'mono',
      icon: 'primary',
      className: '[&_[data-slot=alert-icon]]:text-primary',
    },
    {
      variant: 'mono',
      icon: 'warning',
      className: '[&_[data-slot=alert-icon]]:text-[var(--color-warning-foreground,var(--color-yellow-600))]',
    },
    {
      variant: 'mono',
      icon: 'success',
      className: '[&_[data-slot=alert-icon]]:text-[var(--color-success-foreground,var(--color-green-600))]',
    },
    {
      variant: 'mono',
      icon: 'destructive',
      className: '[&_[data-slot=alert-icon]]:text-destructive',
    },
    {
      variant: 'mono',
      icon: 'info',
      className: '[&_[data-slot=alert-icon]]:text-[var(--color-info-foreground,var(--color-violet-600))]',
    },
  ],
  defaultVariants: {
    variant: 'secondary',
    appearance: 'solid',
    size: 'md',
  },
});

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  close?: boolean;
  onClose?: () => void;
}

interface AlertIconProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

function Alert({ className, variant, size, icon, appearance, close = false, onClose, children, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, size, icon, appearance }), className)}
      {...props}
    >
      {children}
      {close && (
        <Button
          size="sm"
          variant="inverse"
          mode="icon"
          onClick={onClose}
          aria-label="Dismiss"
          data-slot="alert-close"
          className={cn('group shrink-0 size-4')}
        >
          <X className="opacity-60 group-hover:opacity-100 size-4" />
        </Button>
      )}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <div data-slot="alert-title" className={cn('grow tracking-tight', className)} {...props} />;
}

function AlertIcon({ children, className, ...props }: AlertIconProps) {
  return (
    <div data-slot="alert-icon" className={cn('shrink-0', className)} {...props}>
      {children}
    </div>
  );
}

function AlertToolbar({ children, className, ...props }: AlertIconProps) {
  return (
    <div data-slot="alert-toolbar" className={cn(className)} {...props}>
      {children}
    </div>
  );
}

function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('text-sm [&_p]:leading-relaxed [&_p]:mb-2', className)}
      {...props}
    />
  );
}

function AlertContent({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      data-slot="alert-content"
      className={cn('space-y-2 [&_[data-slot=alert-title]]:font-semibold', className)}
      {...props}
    />
  );
}

export { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle, AlertToolbar };


```





客户评论

场地设计展示

我们的产品适合什么地方

采购流程

表单

页脚

### 产品中心

1\.产品中心是一个多级下拉菜单栏设计，当我鼠标移入产品，显示产品下的分类，鼠标移入分类，显示子类，鼠标移入子类显示图片。

2\.搜索\+产品分类（要显示全部一级分类）、价格、标签筛选\+产品卡片或者列表展示

```HTML
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>纯CSS 1:1 官方原厂还原 - Google AI Studio 输入框</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

        /* 1. 注入 Google 官方的浏览器自定义属性，允许 CSS 渐变动效 */
        @property --angle {
            syntax: "<angle>";
            initial-value: 0deg;
            inherits: false;
        }

        :root {
            /* 官方暗黑底色与卡片系统变量 */
            --color-v3-bg: #0b0b0c;
            --color-v3-surface-container: #1f1f1f;
            --color-prompt-input-background: #131314;
            --color-prompt-input-border: rgba(255, 255, 255, 0.08);
            --color-v3-text-link: #7499ff;
            --color-v3-overlay-background: rgba(19, 19, 20, 0.7);

            /* 官方定义的暗流四色 (Subtle) */
            --conic-neutral-color: #1f1f1f;
            --conic-blue-subtle: rgba(66, 133, 244, 0.55);
            --conic-green-subtle: rgba(26, 166, 74, 0.5);
            --conic-yellow-subtle: rgba(252, 189, 0, 0.5);
            --conic-red-subtle: rgba(219, 55, 45, 0.5);

            /* 官方定义的暴走四色 (In-progress) */
            --conic-blue-color: #4285f4;
            --conic-green-color: #1aa64a;
            --conic-yellow-color: #fcbd00;
            --conic-red-color: #db372d;
        }

        body {
            background-color: var(--color-v3-bg);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: 'Inter', sans-serif;
        }

        /* 核心宿主容器：对应 ms-applet-generator-form */
        .ms-applet-generator-form {
            width: 100%;
            max-width: 874px;
            box-sizing: border-box;
        }

        /* 2. 官方核心流光管道容器：.input-container */
        .ms-applet-generator-form.animating .input-container {
            position: relative;
            padding: 1px; /* 挤出 1px 的精致边框 */
            border-radius: 24px;
            /* 部署官方 1:1 分段角随渐变 */
            background: conic-gradient(from var(--angle) at 50% 50%,
                var(--conic-neutral-color) 0deg,
                var(--conic-neutral-color) 69deg,
                var(--conic-blue-subtle) 115deg,
                var(--conic-green-subtle) 193deg,
                var(--conic-neutral-color) 270deg,
                var(--conic-yellow-subtle) 291deg,
                var(--conic-red-subtle) 322deg,
                var(--conic-neutral-color) 1turn
            );
            /* 默认状态：静谧暗流转动，10秒一圈 */
            animation: rotate-gradient-v2 10s linear infinite;
            box-shadow: 0 3px 3px -1.5px rgba(10,13,18,.04),0 8px 8px -4px rgba(10,13,18,.03),0 20px 24px -4px rgba(10,13,18,.08);
        }

        /* 当切换为 .in-progress（全力爆发状态） */
        .ms-applet-generator-form.animating .input-container.in-progress {
            background: conic-gradient(from var(--angle) at 50% 50%,
                var(--conic-neutral-color) 0deg,
                var(--conic-neutral-color) 69deg,
                var(--conic-blue-color) 115deg,
                var(--conic-green-color) 193deg,
                var(--conic-neutral-color) 270deg,
                var(--conic-yellow-color) 291deg,
                var(--conic-red-color) 322deg,
                var(--conic-neutral-color) 1turn
            );
            /* 全力加速：4秒一圈 */
            animation: rotate-gradient-v2 4s linear infinite;
        }

        /* 3. 官方双层霓虹光晕核心：:after 伪元素外部环境晕染 */
        .ms-applet-generator-form.animating .input-container::after {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -1;
            border-radius: inherit;
            background: inherit;
            filter: blur(14px);
            opacity: .4;
            transition: opacity .8s ease-out, filter .8s ease-out;
            pointer-events: none;
        }
        /* 爆发状态下，光晕更浓郁、扩散半径更大 */
        .ms-applet-generator-form.animating .input-container.in-progress::after {
            filter: blur(18px);
            opacity: .7;
        }

        /* 4. 内部包装纸，遮罩出内部输入区域 */
        .prompt-input-wrapper {
            border-radius: 24px;
            background: var(--color-prompt-input-background);
            padding: 20px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            min-height: 100px;
            box-sizing: border-box;
            position: relative;
        }

        /* 5. 官方拖拽遮罩层还原：.dragging-overlay */
        .dragging-overlay {
            position: absolute;
            background-color: var(--color-v3-overlay-background);
            backdrop-filter: blur(5px);
            z-index: 10;
            border: 2px dashed var(--color-v3-text-link);
            pointer-events: none;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 8px;
            color: var(--color-v3-text-link);
            font-size: 14px;
            font-weight: 500;
            inset: 0;
            border-radius: inherit;
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s ease-in-out;
        }

        /* 当外部给 wrapper 挂载拖拽类名时的触发状态 */
        .prompt-input-wrapper.dragging .dragging-overlay {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
        }

        /* 基础控制 */
        .text-wrapper { flex: 1; }
        .prompt-textarea {
            width: 100%;
            background: transparent;
            border: none;
            outline: none;
            color: #fff;
            font-size: 14px;
            font-family: inherit;
            line-height: 21px;
            resize: none;
        }
        .prompt-textarea::placeholder { color: #8e9196; }

        .actions-container { display: flex; align-items: center; gap: 12px; }
        .icon-btn {
            background: transparent; border: none; color: #8e9196;
            font-size: 18px; cursor: pointer; transition: color 0.2s;
        }
        .icon-btn:hover { color: #fff; }

        /* 右侧绚丽按钮 */
        .ifl-button {
            background: #232324;
            color: #fff;
            border: 1px solid #444746;
            padding: 10px 18px;
            border-radius: 20px;
            font-weight: 500;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .ifl-button span.spark {
            background: linear-gradient(90deg, #4285f4, #9b51e0, #e94235);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        /* 纯CSS旋转引擎 */
        @keyframes rotate-gradient-v2 {
            to { --angle: 360deg; }
        }
    </style>
</head>
<body>

    <div class="ms-applet-generator-form animating" id="hostForm">
        <div class="input-container" id="flowContainer">
            
            <div class="prompt-input-wrapper" id="dropWrapper">
                <div class="dragging-overlay">
                    <span style="font-size: 24px;">➕</span>
                    Drop files here
                </div>

                <div class="text-wrapper">
                    <textarea class="prompt-textarea" rows="2" placeholder="Describe an app and let Gemini do the rest" id="inputField"></textarea>
                </div>

                <div class="actions-container">
                    <button class="icon-btn" title="语音">🎙️</button>
                    <button class="icon-btn" style="font-size:22px; font-weight:300;">+</button>
                    <button class="ifl-button" id="actionBtn">
                        <span class="spark">✦</span>
                        <span id="btnText">I'm feeling lucky</span>
                    </button>
                </div>
            </div>

        </div>
    </div>

    <script>
        const hostForm = document.getElementById('hostForm');
        const flowContainer = document.getElementById('flowContainer');
        const inputField = document.getElementById('inputField');
        const actionBtn = document.getElementById('actionBtn');
        const btnText = document.getElementById('btnText');
        const dropWrapper = document.getElementById('dropWrapper');

        // 交互逻辑一：输入有字时激活流光状态，没字时移除动画（完美复刻官方规则）
        inputField.addEventListener('input', () => {
            if (inputField.value.trim().length > 0) {
                hostForm.classList.add('animating');
            } else {
                hostForm.classList.remove('animating');
            }
        });

        // 交互逻辑二：点击按钮，瞬间切入官方“算力爆发”急促状态 (.in-progress)
        actionBtn.addEventListener('click', () => {
            if (!flowContainer.classList.contains('in-progress')) {
                flowContainer.classList.add('in-progress');
                btnText.innerText = "Building app...";
                
                // 模拟3秒后跑完，切回常规暗流
                setTimeout(() => {
                    flowContainer.classList.remove('in-progress');
                    btnText.innerText = "I'm feeling lucky";
                }, 4000);
            }
        });

        // 交互逻辑三：1:1 复刻文件拖入悬停特效
        window.addEventListener('dragover', (e) => { e.preventDefault(); dropWrapper.classList.add('dragging'); });
        window.addEventListener('dragleave', () => { dropWrapper.classList.remove('dragging'); });
        window.addEventListener('drop', (e) => { e.preventDefault(); dropWrapper.classList.remove('dragging'); });
    </script>
</body>
</html>
```

3\.商品显示：图片3：4的，价格，标题，说明，喜欢的人数，喜欢图标。当用户点击了喜欢，他会有动画到侧边的喜欢按钮上，还有数字角标。动画可以参考京东的加入购物车动画

```TypeScript
import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean; // When true, ignores size prop and uses width/height or className
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 }
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', y.toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };

    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  // Determine sizing
  const getSizeClasses = () => {
    if (customSize) {
      return ''; // Let className or inline styles handle sizing
    }
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    const baseStyles = {
      '--base': base,
      '--spread': spread,
      '--radius': '14',
      '--border': '3',
      '--backdrop': 'hsl(0 0% 60% / 0.12)',
      '--backup-border': 'var(--backdrop)',
      '--size': '200',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'fixed',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative' as const,
      touchAction: 'none' as const,
    };

    // Add width and height if provided
    if (width !== undefined) {
      baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    }

    return baseStyles;
  };

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }
    
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }
    
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? 'aspect-[3/4]' : ''}
          rounded-2xl 
          relative 
          grid 
          grid-rows-[1fr_auto] 
          shadow-[0_1rem_2rem_-1rem_black] 
          p-4 
          gap-4 
          backdrop-blur-[5px]
          ${className}
        `}
      >
        <div ref={innerRef} data-glow></div>
        {children}
      </div>
    </>
  );
};

export { GlowCard }
```

### 联系我们

表单（客户电话、邮箱、名字、国家城市、采购需求描述、喜欢的商品（系统自己把用户点了喜欢的商品加上去））\+我们的联系方式\+加地图

### 场地设计

要大气

横向可以滚动的已经设计过的场地标签，点击标签显示对应的场地设计。

场地设计要有图片10张起步，每一张都有说明设计理念和想法

### 关于我们（下拉菜单栏：公司介绍、画册、证书、工厂展示、文章内容）

1\.公司介绍：内容你来写，可以写简介、发展历程、地址、规模、奖项，提供哪些服务、能为客户带来什么/赢得客户信赖。可以用时间轴设计

2\.产品画册展示

3\.证书展示

4\.工厂展示

5\.文章内容：如何选择合适自己的机器、买机器一定要注意的几件事、



































