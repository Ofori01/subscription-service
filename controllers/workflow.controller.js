
import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const {serve} = require('@upstash/workflow/express')
import Subscriptions from '../models/subscription.model.js'
import dayjs from "dayjs";


const reminders = [7, 5, 3, 1]

const sendReminders = serve(
    async (context)=>{
        // get subscription id from payload
        const {subscriptionId} = context.requestPayload

        
        // get subscription from db
        const subscription  = await fetchSubscription(context, subscriptionId);
        
        if (!subscription || subscription.status != "active") return;
        const renewalDate = dayjs(subscription.renewalDate);

        // check renewal dates
        if (renewalDate.isBefore(dayjs())) return


        // set reminders
        for (const daysBeforeReminder of reminders){
            // check if reminder date is ahead 
            const reminderDate = renewalDate.subtract(daysBeforeReminder)

            if (reminderDate.isAfter(dayjs())){
                // sleep workflow until reminder date. basically set timeout
                await sleepUntilReminder(context, `Sleeping until ${daysBeforeReminder} days`, reminderDate)

                // trigger reminder on set date
                await triggerReminder()

            }

        }

})

async function fetchSubscription(context, subscriptionId) {
    return await context.run("get subscription", async()=>{
        return await Subscriptions.findById(subscriptionId)

    })
    
}

async function sleepUntilReminder(context, label, date) {
    console.log(`sleeping until ${date}`)
    await context.sleepUntil(label,date.toDate())
    
}

async function triggerReminder(context, label) {
    context.run(label, ()=>{
        console.log(`Triggering reminder for ${label}`)
    })
    
}


export {sendReminders}