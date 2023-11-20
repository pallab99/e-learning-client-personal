import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import AllRoutes from "./routes/routes";

function App() {
  // const colorOptions = [
  //   {
  //     value: '#FFF5E0',
  //     label: 'Beige',
  //   },
  //   {
  //     value: '#FF6969',
  //     label: 'Peach',
  //   },
  //   {
  //     value: '#C70039',
  //     label: 'Maroon',
  //   },
  //   {
  //     value: '#141E46',
  //     label: 'Navy',
  //   },
  // ];
  // const handleChange = (value: string) => {
  //   localStorage.setItem('colorPrimary', value);
  //   setColorPrimary(value);
  // };
  const [colorPrimary, setColorPrimary] = useState("#8710d8");
  useEffect(() => {
    setColorPrimary(localStorage.getItem("colorPrimary") || "#8710d8");
  }, [colorPrimary]);
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
      {/* <Select
        defaultValue="Beige"
        style={{
          width: 120,
        }}
        onChange={handleChange}
        options={colorOptions}
      /> */}
      <AllRoutes />
    </ConfigProvider>
  );
}

export default App;
