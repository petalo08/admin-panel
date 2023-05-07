import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Box } from "@chakra-ui/react";
import ContentLayout from "./ContentLayout";

const BaseLayout = ({ children }) => {
  return (
    <Box>
      <div className="layout">
        <Sidebar />
        <main className="layout__main-content">
          <Header />
          <ContentLayout>{children}</ContentLayout>
        </main>
      </div>
    </Box>
  );
};

export default BaseLayout;
