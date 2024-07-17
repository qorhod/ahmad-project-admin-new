

// دالة الترقيم للقياسات 


// const Counter = require("../models/counter");




const User = require("../models/customersSchema");

async function numberAllMeasurementsForOrder(orderId) {
    const user = await User.findOne({ "orders._id": orderId });

    if (!user) {
        console.log('User not found');
        return;
    }

    const order = user.orders.id(orderId);

    if (!order) {
        console.log('Order not found');
        return;
    }

    if (order.status === 'مؤكد') {
        let sequenceNumber = 1;
        for (let measurement of order.measurement) {
            measurement.sequenceNumber = sequenceNumber++;
        }
    } else {
        console.log('Order is not confirmed');
    }

    await user.save();
    console.log('All measurements for the order have been numbered starting from 1.');
}

module.exports = {
    numberAllMeasurementsForOrder,
};









// const User = require("../models/customersSchema");

// async function getNextSequenceNumber(measurements) {
//     const maxSequenceNumber = Math.max(0, ...measurements.map(m => m.sequenceNumber || 0));
//     return maxSequenceNumber + 1;
// }

// async function numberAllMeasurementsForOrder(orderId) {
//     const user = await User.findOne({ "orders._id": orderId });

//     if (!user) {
//         console.log('User not found');
//         return;
//     }

//     const order = user.orders.id(orderId);

//     if (!order) {
//         console.log('Order not found');
//         return;
//     }

//     if (order.status === 'مؤكد') {
//         let sequenceNumber = 1;
//         const measurements = order.measurement;

//         // تحقق مما إذا كانت هناك قياسات مرقمة بالفعل
//         const maxSequenceNumber = Math.max(0, ...measurements.map(m => m.sequenceNumber || 0));

//         if (maxSequenceNumber > 0) {
//             // إذا كانت هناك قياسات مرقمة بالفعل، ابدأ الترقيم من الرقم التسلسلي الأخير + 1
//             sequenceNumber = maxSequenceNumber + 1;
//         }

//         for (let measurement of measurements) {
//             if (!measurement.sequenceNumber) {
//                 measurement.sequenceNumber = sequenceNumber++;
//             }
//         }

//         await user.save();
//         console.log('All measurements for the order have been numbered starting from the correct sequence number.');
//     } else {
//         console.log('Order is not confirmed');
//     }
// }

// async function addMeasurementAndNumber(orderId, newMeasurement) {
//     const user = await User.findOne({ "orders._id": orderId });

//     if (!user) {
//         console.log('User not found');
//         return;
//     }

//     const order = user.orders.id(orderId);

//     if (!order) {
//         console.log('Order not found');
//         return;
//     }

//     // إضافة القياس الجديد
//     order.measurement.push(newMeasurement);

//     // حفظ التغييرات
//     await user.save();

//     // إعادة ترقيم القياسات
//     await numberAllMeasurementsForOrder(orderId);
// }

// module.exports = {
//     numberAllMeasurementsForOrder,
//     addMeasurementAndNumber,
// };
