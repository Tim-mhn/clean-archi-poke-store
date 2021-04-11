import { Service } from "typedi";
import { AddPokemonToShoppingCartUseCase } from "./addPokemonToShoppingCart.useCase";

export interface EstimateReadyForPickupDateInput {
    pokemonsInCart: { quantity: number, pokemon: { weight, level } }[];
    now: Date;
}



@Service()
export class EstimateReadyForPickupDateUseCase {
    readonly WORKING_HOURS = [8, 18];
    readonly START_WORK_HOUR = 8;
    readonly END_WORK_HOUR = 22;
    readonly FULL_WORKING_DAYS = [1, 2, 3, 4, 5]; // Monday to fri
    readonly START_WORK_DAY = 1; // Monday
    readonly END_WORK_DAY = 5; // Friday
    constructor() {

    }

    public execute(readyForPickupDateInput: EstimateReadyForPickupDateInput): Date {
        const quantityToProcess = this.estimateProcessingMinutes(readyForPickupDateInput.pokemonsInCart);
        const estimatedPickupDate = this.estimateReadyForPickupDate(quantityToProcess, readyForPickupDateInput.now);
        return estimatedPickupDate;

    }

    estimateProcessingMinutes(pokemonsToProcess: { quantity, pokemon: { weight, level } }[]) {
        return pokemonsToProcess
            .map(pokeToProcess => pokeToProcess.quantity * pokeToProcess.pokemon.weight * pokeToProcess.pokemon.level)
            .reduce((totalProcessQty, add) => totalProcessQty + add);
    }

    estimateReadyForPickupDate(processingMinutes: number, now: Date) {

        const nextFirstWorkingMoment = this.getNextStartWorkingTime(now);
        const estimatedPickupDate = new Date(nextFirstWorkingMoment);
        const processingMs = processingMinutes * 60 * 1000;
        estimatedPickupDate.setTime(estimatedPickupDate.getTime() + processingMs);
        return estimatedPickupDate;


       
    }

    getNextStartWorkingTime(now: Date) {
        // Working week
        if (this.START_WORK_DAY <= now.getDay() && now.getDay() <= this.END_WORK_DAY) {
            // Order is passed within working hours
            if (now.getHours() >= this.START_WORK_HOUR && now.getHours() < this.END_WORK_HOUR) {
                return now;
            }
            // Order passed before working day has started
            else if (now.getHours() < this.START_WORK_HOUR) {
                return this.todayStartOfWorkingDay(now);
            }
            // Order passed after working day has ended
            else if (now.getHours() >= this.END_WORK_HOUR) {
                return this.tomorrowStartOfWorkingDay(now);
            }
            
        } else {
            const nextWorkingMoment = new Date(now);
            nextWorkingMoment.setHours(this.START_WORK_HOUR);
            nextWorkingMoment.setMinutes(0);
            nextWorkingMoment.setSeconds(0);
            nextWorkingMoment.setMilliseconds(0);
            if (now.getDay() == 6) {
                nextWorkingMoment.setDate(nextWorkingMoment.getDate() + 2);

            } else if (now.getDay() == 0) {
                nextWorkingMoment.setDate(nextWorkingMoment.getDate() + 1);
            }

            return nextWorkingMoment;
        }
    }
    
    todayStartOfWorkingDay(now: Date) {
        const todayStartOfWorkingDay = new Date(now);
        todayStartOfWorkingDay.setHours(this.START_WORK_HOUR);
        todayStartOfWorkingDay.setMinutes(0);
        todayStartOfWorkingDay.setSeconds(0);
        return todayStartOfWorkingDay;
    }
    todayEndOfWorkingDay(now: Date) {
        const endOfworkingDay = new Date(now);
        endOfworkingDay.setHours(this.END_WORK_HOUR);
        endOfworkingDay.setMinutes(0);
        endOfworkingDay.setSeconds(0);
        return endOfworkingDay;
    }
    tomorrowStartOfWorkingDay(now: Date) {
        const tomorrowStartOfWorkingDay = new Date(now);
        tomorrowStartOfWorkingDay.setHours(this.START_WORK_HOUR);
        tomorrowStartOfWorkingDay.setMinutes(0);
        tomorrowStartOfWorkingDay.setSeconds(0);
        tomorrowStartOfWorkingDay.setDate(tomorrowStartOfWorkingDay.getDate() + 1);
        return tomorrowStartOfWorkingDay;
    }
}