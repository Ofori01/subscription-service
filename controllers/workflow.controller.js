
import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const {serve} = require('@upstash/workflow/express')
import Subscriptions from '../models/subscription.model.js'
import dayjs from "dayjs";
import { sendReminderEmail } from '../utils/email.js';


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
        if (renewalDate.isBefore(dayjs())){
            console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
            return
        }


        // set reminders
        for (const daysBeforeReminder of reminders){
            // check if reminder date is ahead 
            const reminderDate = renewalDate.subtract(daysBeforeReminder, "day")

            if (reminderDate.isAfter(dayjs())){
                // sleep workflow until reminder date. basically set timeout
                await sleepUntilReminder(context, `Sleeping until ${daysBeforeReminder} days`, reminderDate.toDate())

            }
            // trigger reminder on set date
            if(dayjs().isSame(reminderDate, 'day')){
                await triggerReminder(context,`${daysBeforeReminder} days before reminder`, subscription)
            }

        }

})

async function fetchSubscription(context, subscriptionId) {
    return await context.run("get subscription", async()=>{
        return await Subscriptions.findById(subscriptionId).populate('user','email name')

    })
    
}

async function sleepUntilReminder(context, label, date) {
    console.log(`sleeping until ${date}`)
    await context.sleepUntil(label,date)
    
}

async function triggerReminder(context, label,subscription) {
    return await context.run(label, async ()=>{
        console.log(`Triggering reminder for ${label}`)
        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription
        })
    })
    
}


export {sendReminders}