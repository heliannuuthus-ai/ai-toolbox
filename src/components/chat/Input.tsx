import { Input, Button, Space } from 'antd';
import { UploadOutlined, SearchOutlined, BulbOutlined, ArrowUpOutlined } from '@ant-design/icons';

const ChatInput = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px', background: '#f5f5f5', borderRadius: '8px' }}>
      {/* 输入框 */}
      <Input
        placeholder="您想了解什么？"
        style={{ flex: 1, marginRight: '8px', borderRadius: '20px' }}
        size="large"
      />

      {/* 右侧按钮区域 */}
      <Space>
        {/* 上传按钮 */}
        <Button icon={<UploadOutlined />} type="text" />

        {/* DeepSearch 按钮 */}
        <Button icon={<SearchOutlined />}>
          DeepSearch
        </Button>

        {/* 思考按钮 */}
        <Button icon={<BulbOutlined />}>
          思考
        </Button>

        {/* Grok 3 标签和上传箭头 */}
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
          <span style={{ marginRight: '4px', color: '#888' }}>Grok 3</span>
          <Button icon={<ArrowUpOutlined />} type="text" />
        </div>
      </Space>
    </div>
  );
};

export default ChatInput;