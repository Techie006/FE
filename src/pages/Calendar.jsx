import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
// import CalendarLayout from "../components/calendar/CalendarLayout";
import Helper from "../components/common/Helper";
import Footer from "../components/common/Footer";

const Calendar = (props) => {
  return (
    <Layout>
      <Header />
      {/* <CalendarLayout /> */}
      <Helper />
      <Footer />
    </Layout>
  );
};

export default Calendar;
