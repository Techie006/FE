import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import CalendarFrame from "../components/calendar/CalendarFrame";
import Helper from "../components/common/Helper";
import Footer from "../components/common/Footer";

const Calendar = (props) => {
  return (
    <Layout>
      <Header />
      <CalendarFrame />
      <Helper />
      <Footer />
    </Layout>
  );
};

export default Calendar;
