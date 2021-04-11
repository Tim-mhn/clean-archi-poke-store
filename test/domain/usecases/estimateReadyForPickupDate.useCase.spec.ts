import chai, { expect } from 'chai';
import Sinon, { fake } from "sinon";
import sinonChai from 'sinon-chai';
import { EstimateReadyForPickupDateUseCase } from '../../../src/domain/usecases/estimateReadyForPickupDate.usecase';
chai.use(sinonChai);

describe('EstimateReadyforPickupDate Usecase', () => {
    describe('todayEndOfWorkingDay', () => {
        const estimateReadyForPickupDateUsecase = new EstimateReadyForPickupDateUseCase();
        it('should return the same date as today but with time = work closing time', () => {
            const now = new Date(2020, 12, 15, 15, 30, 2); // 15th Dec 2020 15:30:02
            const todaysEndWorkMoment = estimateReadyForPickupDateUsecase.todayEndOfWorkingDay(now);
            const expectedEndWorkMoment = new Date(2020, 12, 15, estimateReadyForPickupDateUsecase.END_WORK_HOUR, 0, 0);
            expect(todaysEndWorkMoment).to.be.deep.equal(expectedEndWorkMoment)
        })

        it('should not mutate input', () => {
            const now = new Date(2020, 12, 15, 15, 30, 2); // 15th Dec 2020 15:30:02
            const time = now.getTime();
            estimateReadyForPickupDateUsecase.todayEndOfWorkingDay(now);

            expect(now.getTime()).to.be.equal(time);
        })
    })

    describe('estimateReadyForPickupDate', () => {
        const estimateReadyForPickupDateUsecase = new EstimateReadyForPickupDateUseCase();
        it('should return order date + 2h if order is passed within the working days and hours and the 2h of processing time are completed before the end of working day', () => {
            const monday = new Date(2020, 1, 1);
            monday.setDate(monday.getDate() + (1 + 7 - monday.getDay()) % 7); // make it a monday
            monday.setHours(estimateReadyForPickupDateUsecase.START_WORK_HOUR); // time = start working time

            const processingQuantity = 120; // 120 mins -> 2h;

            const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(processingQuantity, monday);

            const expectedDate = new Date(2020, 1, monday.getDate(), estimateReadyForPickupDateUsecase.START_WORK_HOUR + 2);
            expect(readyForPickupDate).to.be.deep.equal(expectedDate)
        })

        it('should return same day as order date but 11am if order is passed before 8am (start of working day) and processing time is 3h', () => {
            const HOUR_BEFORE_START_OF_DAY = 4;
            const monday = new Date(2020, 1, 1);
            monday.setDate(monday.getDate() + (1 + 7 - monday.getDay()) % 7); // make it a monday
            monday.setHours(HOUR_BEFORE_START_OF_DAY); // order passed before start of working time

            const processingQuantity = 180; // 180 mins -> 3h;

            const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(processingQuantity, monday);

            const expectedDate = new Date(2020, 1, monday.getDate(), estimateReadyForPickupDateUsecase.START_WORK_HOUR + 3);
            expect(readyForPickupDate).to.be.deep.equal(expectedDate)
        })

        it('should return next day as order date at 12am if order is passed after end of working day and processing is 4h', () => {
            const HOUR_AFTER_END_OD_DAY = 22;
            const monday = new Date(2020, 1, 1);
            monday.setDate(monday.getDate() + (1 + 7 - monday.getDay()) % 7); // make it a monday
            monday.setHours(HOUR_AFTER_END_OD_DAY); // order passed before start of working time

            const processingQuantity = 240; // 4h

            const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(processingQuantity, monday);

            const expectedDate = new Date(2020, 1, monday.getDate() + 1, estimateReadyForPickupDateUsecase.START_WORK_HOUR + 4);
            expect(readyForPickupDate).to.be.deep.equal(expectedDate)
        })

        it('should return next day as order date at 12am if order is passed after end of working day and processing is 4h', () => {
            const HOUR_AFTER_END_OD_DAY = 22;
            const monday = new Date(2020, 1, 1);
            monday.setDate(monday.getDate() + (1 + 7 - monday.getDay()) % 7); // make it a monday
            monday.setHours(HOUR_AFTER_END_OD_DAY); // order passed before start of working time

            const processingQuantity = 240; // 4h

            const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(processingQuantity, monday);

            const expectedDate = new Date(2020, 1, monday.getDate() + 1, estimateReadyForPickupDateUsecase.START_WORK_HOUR + 4);
            expect(readyForPickupDate).to.be.deep.equal(expectedDate)
        })

        it('should return next monday if order is passed on a saturday', () => {
            const SATURDAY_DATE = 6;
            const saturday = new Date(2020, 1, 1, 18, 21, 15);
            saturday.setDate(saturday.getDate() + (SATURDAY_DATE + 7 - saturday.getDay()) % 7); // make it a monday

            const processingQuantity = 30; // 1/2h

            const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(processingQuantity, saturday);

            const expectedDate = new Date(2020, 1, saturday.getDate() + 2, estimateReadyForPickupDateUsecase.START_WORK_HOUR, 30);
            expect(readyForPickupDate).to.be.deep.equal(expectedDate)
        })

        it('should return next monday if order is passed on a sunday', () => {
            const sunday_date = 0;
            const sunday = new Date(2020, 1, 1, 18, 21, 15);
            sunday.setDate(sunday.getDate() + (sunday_date + 7 - sunday.getDay()) % 7); // make it a monday

            const processingQuantity = 30; // 1/2h

            const readyForPickupDate = estimateReadyForPickupDateUsecase.estimateReadyForPickupDate(processingQuantity, sunday);

            const expectedDate = new Date(2020, 1, sunday.getDate() + 1, estimateReadyForPickupDateUsecase.START_WORK_HOUR, 30);
            expect(readyForPickupDate).to.be.deep.equal(expectedDate)
        })
    })

})
