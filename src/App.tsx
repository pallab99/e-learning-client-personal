import { ConfigProvider } from 'antd';
import { useScrollToTop } from './hooks/useScrollToTop';
import AllRoutes from './routes/routes';

function App() {
  const colorPrimary = '#8710d8';

  useScrollToTop();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorPrimary,
          borderRadius: 0,
          fontSize: 16,
        },
      }}
    >
      <AllRoutes />
    </ConfigProvider>
  );
}

export default App;
