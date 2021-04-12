import chai, { expect } from "chai";
import Sinon, { fake } from "sinon";
import sinonChai from "sinon-chai";
import { EstimateReadyForPickupDateUseCase } from "../../../src/domain/usecases/estimateReadyForPickupDate.usecase";
chai.use(sinonChai);

describe("EstimateReadyforPickupDate Usecase", () => {
  describe("todayEndOfWorkingDay", () => {
    const estimateReadyForPickupDateUsecase = new EstimateReadyForPickupDateUseCase();
    it("should return the same date as today but with time = work closing time", () => {
      const now = new Date(2020, 12, 15, 15, 30, 2); // 15th Dec 2020 15:30:02
      const todaysEndWorkMoment = estimateReadyForPickupDateUsecase.todayEndOfWorkingDay(
        now
      );
      const expectedEndWorkMoment = new Date(
        2020,
        12,
        15,
        estimateReadyForPickupDateUsecase.END_WORK_HOUR,
        0,
        0
      );
      expect(todaysEndWorkMoment).to.be.deep.equal(expectedEndWorkMoment);
    });

    it("should not mutate input", () => {
      const now = new Date(2020, 12, 15, 15, 30, 2); // 15th Dec 2020 15:30:02
      const time = now.getTime();
      estimateReadyForPickupDateUsecase.todayEndOfWorkingDay(now);

      expect(now.getTime()).to.be.equal(time);
    });
  });

  describe("estimateReadyForPickupDate", () => {
    const estimateReadyForPickupDateUsecase = new EstimateReadyForPickupDateUseCase();
    it("should return order date + 2h if order is passed within the working days and hours and the 2h of processing time are completed before the end of working day", () => {
      const monday = new Date(2020, 1, 1);
      monday.setDate(monday.getDate() + ((1 + 7 - monday.getDay()) % 7)); // make it a monday
      monday.setHours(estimateReadyForPickupDateUsecase.START_WORK_HOUR); // time = start working time

      const processingQuantity = 120; // 120 mins -> 2h;

      const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(
        processingQuantity,
        monday
      );

      const expectedDate = new Date(
        2020,
        1,
        monday.getDate(),
        estimateReadyForPickupDateUsecase.START_WORK_HOUR + 2
      );
      expect(readyForPickupDate).to.be.deep.equal(expectedDate);
    });

    it("should return same day as order date but 11am if order is passed before 8am (start of working day) and processing time is 3h", () => {
      const HOUR_BEFORE_START_OF_DAY = 4;
      const monday = new Date(2020, 1, 1);
      monday.setDate(monday.getDate() + ((1 + 7 - monday.getDay()) % 7)); // make it a monday
      monday.setHours(HOUR_BEFORE_START_OF_DAY); // order passed before start of working time

      const processingQuantity = 180; // 180 mins -> 3h;

      const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(
        processingQuantity,
        monday
      );

      const expectedDate = new Date(
        2020,
        1,
        monday.getDate(),
        estimateReadyForPickupDateUsecase.START_WORK_HOUR + 3
      );
      expect(readyForPickupDate).to.be.deep.equal(expectedDate);
    });

    it("should return next day as order date at 12am if order is passed after end of working day and processing is 4h", () => {
      const HOUR_AFTER_END_OD_DAY = 22;
      const monday = new Date(2020, 1, 1);
      monday.setDate(monday.getDate() + ((1 + 7 - monday.getDay()) % 7)); // make it a monday
      monday.setHours(HOUR_AFTER_END_OD_DAY); // order passed before start of working time

      const processingQuantity = 240; // 4h

      const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(
        processingQuantity,
        monday
      );

      const expectedDate = new Date(
        2020,
        1,
        monday.getDate() + 1,
        estimateReadyForPickupDateUsecase.START_WORK_HOUR + 4
      );
      expect(readyForPickupDate).to.be.deep.equal(expectedDate);
    });

    it("should return next day as order date at 12am if order is passed after end of working day and processing is 4h", () => {
      const HOUR_AFTER_END_OD_DAY = 22;
      const monday = new Date(2020, 1, 1);
      monday.setDate(monday.getDate() + ((1 + 7 - monday.getDay()) % 7)); // make it a monday
      monday.setHours(HOUR_AFTER_END_OD_DAY); // order passed before start of working time

      const processingQuantity = 240; // 4h

      const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(
        processingQuantity,
        monday
      );

      const expectedDate = new Date(
        2020,
        1,
        monday.getDate() + 1,
        estimateReadyForPickupDateUsecase.START_WORK_HOUR + 4
      );
      expect(readyForPickupDate).to.be.deep.equal(expectedDate);
    });

    it("should return next monday if order is passed on a saturday", () => {
      const SATURDAY_DATE = 6;
      const saturday = new Date(2020, 1, 1, 18, 21, 15);
      saturday.setDate(
        saturday.getDate() + ((SATURDAY_DATE + 7 - saturday.getDay()) % 7)
      ); // make it a monday

      const processingQuantity = 30; // 1/2h

      const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(
        processingQuantity,
        saturday
      );

      const expectedDate = new Date(
        2020,
        1,
        saturday.getDate() + 2,
        estimateReadyForPickupDateUsecase.START_WORK_HOUR,
        30
      );
      expect(readyForPickupDate).to.be.deep.equal(expectedDate);
    });

    it("should return next monday if order is passed on a sunday", () => {
      const sunday_date = 0;
      const sunday = new Date(2020, 1, 1, 18, 21, 15);
      sunday.setDate(
        sunday.getDate() + ((sunday_date + 7 - sunday.getDay()) % 7)
      ); // make it a monday

      const processingQuantity = 30; // 1/2h

      const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(
        processingQuantity,
        sunday
      );

      const expectedDate = new Date(
        2020,
        1,
        sunday.getDate() + 1,
        estimateReadyForPickupDateUsecase.START_WORK_HOUR,
        30
      );
      expect(readyForPickupDate).to.be.deep.equal(expectedDate);
    });

    it("should return next thursday 10am if order is passed on tuesday 3pm and processingQuantity is 15h=15*60mins", () => {
      const tuesday_date = 2;
      const tuesday = new Date(2020, 1, 1, 15, 0, 0); // 3pm tuesday
      tuesday.setDate(
        tuesday.getDate() + ((tuesday_date + 7 - tuesday.getDay()) % 7)
      ); // make it a tuesday

      const processingQuantity = 15 * 60; // 15h

      const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(
        processingQuantity,
        tuesday
      );

      const expectedDate = new Date(
        2020,
        1,
        tuesday.getDate() + 2, // 2 days after
        estimateReadyForPickupDateUsecase.START_WORK_HOUR + 2 // 10am (if start work hour is 8am)
      );
      expect(readyForPickupDate).to.be.deep.equal(expectedDate);
    });

    it("should return next wednesday 10:30am if order is passed on saturday processingQuantity is 10 (monday) + 10 (tuesday) + 2.5 = 22.5h = 22.5*60mins", () => {
      const SATURDAY_DATE = 6;
      const saturday = new Date(2020, 1, 1, 15, 0, 0); // 3pm saturday (time doesnt matter here)
      saturday.setDate(
        saturday.getDate() + ((SATURDAY_DATE + 7 - saturday.getDay()) % 7)
      ); // make it a tuesday

      const processingQuantity = 22.5 * 60; // 15h

      const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(
        processingQuantity,
        saturday
      );

      const expectedDate = new Date(
        2020,
        1,
        saturday.getDate() + 4, // 4 days after (saturday -> wednesday)
        estimateReadyForPickupDateUsecase.START_WORK_HOUR + 2, // 10am (if start work hour is 8am)
        30
      );
      expect(readyForPickupDate).to.be.deep.equal(expectedDate);
    });
  });

  describe("Process One Day fn", () => {
    const estimateReadyForPickupDateUsecase = new EstimateReadyForPickupDateUseCase();

    it("should return 0 remainingProcesingMinutes and same date as input + processingMinutes as pickupdate if date is in working days/hours", () => {
      const tuesday_date = 2;
      const tuesday = new Date(
        2020,
        1,
        1,
        estimateReadyForPickupDateUsecase.START_WORK_HOUR + 1,
        0,
        0
      ); // 3pm tuesday
      tuesday.setDate(
        tuesday.getDate() + ((tuesday_date + 7 - tuesday.getDay()) % 7)
      ); // make it a tuesday
      const processingMins = 20;
      const {
        endOfDayOrPickupDate,
        remainingProcessingMins,
      } = estimateReadyForPickupDateUsecase.processOneDay(
        processingMins,
        tuesday
      );

      const expectedendOfDayOrPickupDate = new Date(tuesday);
      expectedendOfDayOrPickupDate.setMinutes(
        tuesday.getMinutes() + processingMins
      );
      expect(remainingProcessingMins).to.be.equal(0);
      expect(endOfDayOrPickupDate).to.be.deep.equal(
        expectedendOfDayOrPickupDate
      );
    });

    it("should return remainingProcesingMinutes > 0 and end of working day if date is in working hours/days but processing quantity is more than what can be done in one day", () => {
      const tuesday_date = 2;
      const tuesday = new Date(
        2020,
        1,
        1,
        estimateReadyForPickupDateUsecase.START_WORK_HOUR + 1,
        0,
        0
      ); // 3pm tuesday
      tuesday.setDate(
        tuesday.getDate() + ((tuesday_date + 7 - tuesday.getDay()) % 7)
      ); // make it a tuesday
      const hugeProcessingMinutes =
        60 *
        (estimateReadyForPickupDateUsecase.END_WORK_HOUR -
          estimateReadyForPickupDateUsecase.START_WORK_HOUR +
          5);
      const {
        endOfDayOrPickupDate,
        remainingProcessingMins,
      } = estimateReadyForPickupDateUsecase.processOneDay(
        hugeProcessingMinutes,
        tuesday
      );

      const expectedEndOfWorkDay = new Date(tuesday);
      expectedEndOfWorkDay.setMinutes(0);
      expectedEndOfWorkDay.setHours(
        estimateReadyForPickupDateUsecase.END_WORK_HOUR
      );

      expect(remainingProcessingMins).to.be.above(0);
      expect(endOfDayOrPickupDate).to.be.deep.equal(expectedEndOfWorkDay);
    });

    it("should return remainingProcesingMinutes > 0 and next monday at end of working hour if date is in the weekend and processing is more than what can be done in one day", () => {
      const SATURDAY_DATE = 6;
      const saturday = new Date(2020, 1, 1, 15, 0, 0); // 3pm saturday (time doesnt matter here)
      saturday.setDate(
        saturday.getDate() + ((SATURDAY_DATE + 7 - saturday.getDay()) % 7)
      ); //

      const hugeProcessingMinutes =
        60 *
        (estimateReadyForPickupDateUsecase.END_WORK_HOUR -
          estimateReadyForPickupDateUsecase.START_WORK_HOUR +
          5);
      const {
        endOfDayOrPickupDate,
        remainingProcessingMins,
      } = estimateReadyForPickupDateUsecase.processOneDay(
        hugeProcessingMinutes,
        saturday
      );

      const expectedendOfDayOrPickupDate = new Date(saturday);
      expectedendOfDayOrPickupDate.setDate(expectedendOfDayOrPickupDate.getDate() + 2); // next monday
      expectedendOfDayOrPickupDate.setMinutes(0);
      expectedendOfDayOrPickupDate.setHours(
        estimateReadyForPickupDateUsecase.END_WORK_HOUR
      );

      expect(remainingProcessingMins).to.be.above(0);
      expect(endOfDayOrPickupDate).to.be.deep.equal(
        expectedendOfDayOrPickupDate
      );
    });
  });
});
