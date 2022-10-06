import Layout from "../elements/templates/Layout";
import Header from "../elements/organisms/Header";
import CalendarFrame from "../components/calendar/CalendarFrame";
import Helper from "../elements/organisms/Helper";

const Calendar = (props) => {
  return (
    <Layout>
      <Header />
      <CalendarFrame />
      <Helper />
    </Layout>
  );
};

export default Calendar;
