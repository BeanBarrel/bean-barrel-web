import React from "react";
import { Layout, Typography, Row, Col, Card } from "antd";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header
        style={{
          background: "#1a1a1a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ color: "#fff", margin: 0 }}>
          Bean Barrel
        </Title>
      </Header>

      {/* Content */}
      <Content style={{ padding: "50px 20px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Title level={2}>Welcome to Bean Barrel</Title>
          <Paragraph style={{ fontSize: "16px" }}>
            Where every cup tells a story.
          </Paragraph>
          <Paragraph style={{ fontSize: "16px", fontWeight: 500 }}>
            📍 Bean Barrel, Goshree Chathiyath Rd, Ayyappankavu, Kochi
          </Paragraph>
          <a
            href="https://g.co/kgs/dxjvKCx"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "16px", color: "#1890ff" }}
          >
            More Info
          </a>
        </div>

        {/* About Cards */}
<Row gutter={[16, 16]} justify="center">
  <Col xs={24} sm={12} md={8}>
    <Card bordered={true} style={{ textAlign: "center" }}>
      <Title level={4}>Freshly Brewed</Title>
      <Paragraph>
        Every cup is made from carefully sourced beans, roasted to
        perfection for the best taste on the go.
      </Paragraph>
    </Card>
  </Col>

  <Col xs={24} sm={12} md={8}>
    <Card bordered={true} style={{ textAlign: "center" }}>
      <Title level={4}>Food Truck Vibes</Title>
      <Paragraph>
        Experience the charm of our mobile cafe, serving coffee with
        warmth and a smile wherever we park.
      </Paragraph>
    </Card>
  </Col>

  <Col xs={24} sm={12} md={8}>
    <Card bordered={true} style={{ textAlign: "center" }}>
      <Title level={4}>Perfect Spot</Title>
      <Paragraph>
        Conveniently located on Goshree Chathiyath Rd, Kochi —
        a perfect stop to grab your favorite coffee on the move.
      </Paragraph>
    </Card>
  </Col>
</Row>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center" }}>
        © 2025 Zeeza Global. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default HomePage;
