import { initDb, runQuery, getRow } from './index';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');

  try {
    await initDb();

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminExists = getRow('SELECT id FROM users WHERE username = ?', ['admin']);
    if (!adminExists) {
      runQuery('INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)', ['admin', hashedPassword, 'admin@company.com', 'admin']);
    }
    const editorExists = getRow('SELECT id FROM users WHERE username = ?', ['editor']);
    if (!editorExists) {
      runQuery('INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)', ['editor', hashedPassword, 'editor@company.com', 'editor']);
    }
    console.log('Users seeded');

    const catCount = getRow<{ total: number }>('SELECT COUNT(*) as total FROM categories');
    if ((catCount?.total || 0) === 0) {
      runQuery('INSERT INTO categories (name, icon, sort_order) VALUES (?, ?, ?)', ['智能制造', '', 1]);
      runQuery('INSERT INTO categories (name, icon, sort_order) VALUES (?, ?, ?)', ['工业自动化', '⚙️', 2]);
      runQuery('INSERT INTO categories (name, icon, sort_order) VALUES (?, ?, ?)', ['新能源技术', '🔋', 3]);
      runQuery('INSERT INTO categories (name, icon, sort_order) VALUES (?, ?, ?)', ['物联网设备', '', 4]);
      runQuery('INSERT INTO categories (name, icon, sort_order) VALUES (?, ?, ?)', ['精密仪器', '🔬', 5]);
    }
    console.log('Categories seeded');

    const prodCount = getRow<{ total: number }>('SELECT COUNT(*) as total FROM products');
    if ((prodCount?.total || 0) === 0) {
      const products = [
        ['智能生产线控制系统', '基于AI的全自动化生产线控制系统，支持实时监控、数据分析、故障预警等功能。采用先进的机器视觉技术，实现生产过程的智能化管理。', 'https://picsum.photos/seed/product1/800/600', 1, 1],
        ['工业机器人手臂', '高精度六轴工业机器人，负载能力达20kg，重复定位精度±0.02mm。适用于焊接、装配、搬运等多种工业场景。', 'https://picsum.photos/seed/product2/800/600', 1, 2],
        ['PLC可编程控制器', '高性能可编程逻辑控制器，支持多种通信协议，可扩展I/O模块，适用于各种工业自动化控制需求。', 'https://picsum.photos/seed/product3/800/600', 2, 1],
        ['伺服驱动系统', '高精度伺服驱动系统，响应速度快，控制精度高。支持多种电机类型，适用于精密定位和速度控制场景。', 'https://picsum.photos/seed/product4/800/600', 2, 2],
        ['太阳能逆变器', '高效率太阳能并网逆变器，转换效率达98.5%，支持智能MPPT追踪，兼容多种光伏组件。', 'https://picsum.photos/seed/product5/800/600', 3, 1],
        ['储能电池管理系统', '智能锂电池管理系统，支持SOC/SOH精准估算，具备过充过放保护、温度监控、均衡充电等功能。', 'https://picsum.photos/seed/product6/800/600', 3, 2],
        ['工业物联网网关', '支持5G/4G/WiFi多模通信的工业级物联网网关，支持Modbus、OPC UA等工业协议，实现设备数据采集与云端传输。', 'https://picsum.photos/seed/product7/800/600', 4, 1],
        ['智能传感器网络', '工业级无线传感器网络系统，支持温度、压力、振动等多种参数采集，具备自组网、低功耗、高可靠等特点。', 'https://picsum.photos/seed/product8/800/600', 4, 2],
        ['高精度测量仪器', '纳米级精度测量仪器，支持三维坐标测量、表面粗糙度检测等功能，广泛应用于精密制造领域。', 'https://picsum.photos/seed/product9/800/600', 5, 1],
        ['光学检测设备', '基于机器视觉的光学检测系统，支持缺陷检测、尺寸测量、颜色识别等功能，检测速度快、精度高。', 'https://picsum.photos/seed/product10/800/600', 5, 2],
        ['数控机床加工中心', '五轴联动数控加工中心，支持复杂曲面加工，配备自动换刀系统，适用于航空航天、汽车制造等高端领域。', 'https://picsum.photos/seed/product11/800/600', 1, 3],
        ['智能仓储系统', '自动化立体仓储系统，支持WMS仓储管理，配备AGV搬运机器人，实现货物自动存取、库存实时管理。', 'https://picsum.photos/seed/product12/800/600', 2, 3],
      ];
      for (const p of products) {
        runQuery('INSERT INTO products (name, description, image, category_id, sort_order) VALUES (?, ?, ?, ?, ?)', p);
      }
    }
    console.log('Products seeded');

    const partnerCount = getRow<{ total: number }>('SELECT COUNT(*) as total FROM partners');
    if ((partnerCount?.total || 0) === 0) {
      const partners = [
        ['华为技术', 'https://picsum.photos/seed/huawei/200/100', 1],
        ['中兴通讯', 'https://picsum.photos/seed/zte/200/100', 2],
        ['比亚迪', 'https://picsum.photos/seed/byd/200/100', 3],
        ['格力电器', 'https://picsum.photos/seed/gree/200/100', 4],
        ['海尔集团', 'https://picsum.photos/seed/haier/200/100', 5],
        ['美的集团', 'https://picsum.photos/seed/midea/200/100', 6],
        ['中国中车', 'https://picsum.photos/seed/crrc/200/100', 7],
        ['国家电网', 'https://picsum.photos/seed/stategrid/200/100', 8],
      ];
      for (const p of partners) {
        runQuery('INSERT INTO partners (name, logo, sort_order) VALUES (?, ?, ?)', p);
      }
    }
    console.log('Partners seeded');

    const bannerCount = getRow<{ total: number }>('SELECT COUNT(*) as total FROM banners');
    if ((bannerCount?.total || 0) === 0) {
      runQuery('INSERT INTO banners (image, title, sort_order) VALUES (?, ?, ?)', ['https://picsum.photos/seed/banner1/1920/600', '智能制造引领未来', 1]);
      runQuery('INSERT INTO banners (image, title, sort_order) VALUES (?, ?, ?)', ['https://picsum.photos/seed/banner2/1920/600', '创新驱动发展', 2]);
      runQuery('INSERT INTO banners (image, title, sort_order) VALUES (?, ?, ?)', ['https://picsum.photos/seed/banner3/1920/600', '科技改变世界', 3]);
    }
    console.log('Banners seeded');

    const contactExists = getRow('SELECT id FROM contact_info LIMIT 1');
    if (!contactExists) {
      runQuery('INSERT INTO contact_info (phone, email, address, map_url) VALUES (?, ?, ?, ?)', ['400-888-8888', 'contact@company.com', '北京市朝阳区科技园区创新大厦A座', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2708.123456789!2d116.123456!3d39.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDA3JzI0LjQiTiAxMTbCsDA3JzI0LjQiRQ!5e0!3m2!1szh-CN!2scn!4v1234567890']);
    }
    console.log('Contact info seeded');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
