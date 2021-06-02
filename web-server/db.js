const stock = {
	milk: 10,
	bread: 10,
	salt: 10,
	soap: 10,
	pasta: 10,
}

const location_db = {
	milk: [5,6],
	bread: [1,5],
	salt: [6,5],
	soap: [8,9],
	pasta: [9,2],
}


let global_tid = 0;
const tasks_db = [];

const incStock = (p) => {
	stock[p] = stock[p] +1;
}
const reduceStock = (p) => {
	stock[p] = stock[p] -1;
}

const executeTask = (tid) => {
	let task = undefined;
	tasks_db.forEach(t => {
		if(t.id == tid ){
			task = t;
		}
	})

	if(!task){
		// indicate no tid exists
		return	
	}
	if(task.action === 'put_to_stock'){
		incStock(task.product)
	}
	else if(task.action === 'pick_from_stock'){
		reduceStock(task.product);	
	}
	
}

const haveEnoughStock = (task) => {
	const quantity = stock[task.product]
	if(!quantity || quantity === 0){
		return false;	
	}
	return true;
}
const createTask = (p, type) => {
	const task = {};
	let action = ''
	if(type == 'PICK'){
		action = 'pick_from_stock'
	}
	else {
		action = 'put_to_stock'
	}

	tasks_db.push({id:global_tid, action: action, product:p, location: location_db[p]});
	global_tid++;
}

// for adding more stock
const updateStock = (pToCount) => {
	const ps = Object.keys(pToCount);
	ps.forEach(p => {
		if(!stock[p]){
			stock[p] = 0;	
		}
		stock[p] += pToCount[p];
	});
}

const getAllStock = () => {
	let arr = []
	Object.keys(stock).forEach(p => {
		arr.push({"name": p, "amount": stock[p]})
	})
	return arr;
}


const getAllTasks = () => {
	return tasks_db;
}

module.exports = {
	getAllStock,
	getAllTasks,
	createTask,
	executeTask,
};