/*
	By Ken Lau
	Doing polling to look up available iPhone in iReserve
	Users can specify the requirments by input argument
*/
var debug = 1;
// the iReserve link we will keep track
var loc = document.location.origin + '/HK/en_HK/reserve/iPhone/availability.json';
// translate the key part in availability.json into more meaningful variable
// Thank you for Jimmy Sinn to prove the mapping
var stores = {cb: 'R409', ifc: 'R428', fw: 'R485'};
var stores_name = {'R409': 'Causeway Bay', 'R428': 'IFC Mall', 'R485': 'Festival Walk'};
var cap16 = ['MGA82ZP/A','MGA92ZP/A','MGAA2ZP/A','MG472ZP/A','MG482ZP/A','MG492ZP/A'];
var cap64 = ['MGAH2ZP/A','MGAJ2ZP/A','MGAK2ZP/A','MG4F2ZP/A','MG4H2ZP/A','MG4J2ZP/A'];
var cap128 = ['MGAC2ZP/A','MGAE2ZP/A','MGAF2ZP/A','MG4A2ZP/A','MG4C2ZP/A','MG4E2ZP/A'];
var model = [
			// iPhone 6+
			// 16GB
			'MGA82ZP/A','MGA92ZP/A','MGAA2ZP/A',
			// 64GB
			'MGAH2ZP/A','MGAJ2ZP/A','MGAK2ZP/A',
			// 128GB
			'MGAC2ZP/A','MGAE2ZP/A','MGAF2ZP/A',
			// iPhone 6
			// 16GB
			'MG472ZP/A','MG482ZP/A','MG492ZP/A',
			// 64GB
			'MG4F2ZP/A','MG4H2ZP/A','MG4J2ZP/A',
			// 128GB
			'MG4A2ZP/A','MG4C2ZP/A','MG4E2ZP/A'
		];
var models_name = {
		'MGA82ZP/A': 'iPhone 6 Pls  16G Grey  ', 
		'MGA92ZP/A': 'iPhone 6 Pls  16G Silver', 
		'MGAA2ZP/A': 'iPhone 6 Pls  16G Gold  ', 
		'MGAH2ZP/A': 'iPhone 6 Pls  64G Grey  ', 
		'MGAJ2ZP/A': 'iPhone 6 Pls  64G Silver', 
		'MGAK2ZP/A': 'iPhone 6 Pls  64G Gold  ', 
		'MGAC2ZP/A': 'iPhone 6 Pls 128G Grey  ', 
		'MGAE2ZP/A': 'iPhone 6 Pls 128G Silver', 
		'MGAF2ZP/A': 'iPhone 6 Pls 128G Gold  ', 
		'MG472ZP/A': 'iPhone 6       16G Grey  ', 
		'MG482ZP/A': 'iPhone 6       16G Silver', 
		'MG492ZP/A': 'iPhone 6       16G Gold  ', 
		'MG4F2ZP/A': 'iPhone 6       64G Grey  ', 
		'MG4H2ZP/A': 'iPhone 6       64G Silver', 
		'MG4J2ZP/A': 'iPhone 6       64G Gold  ', 
		'MG4A2ZP/A': 'iPhone 6      128G Grey  ', 
		'MG4C2ZP/A': 'iPhone 6      128G Silver', 
		'MG4E2ZP/A': 'iPhone 6      128G Gold  '};


/*
 *	timeInt: how long to check again, folting point/ integer in second
 *	model: iPhone model, input: 6 or 6+ or null
 *	color: iPhone color, input: grey, silver, gold or null
 *	cap: iPhone capacity, input: 16, 64, 128
 *	store: where to get the iPhone, input cb, ifc, fw
 */
function start(timeInt, phone_model, color, cap, store)
{	
	// store check, if the input is correct or not
	switch(store)
	{
		case 'ifc':
		case 'cb':
		case 'fw':
			store = [store];
			break;
		default:
			store = ['ifc', 'cb', 'fw'];
	}
	// to get the modle user want
	var target = filter_model(phone_model, color, cap);
	
	setInterval(function(){
		$.ajax({
			url: loc,
			data: 'json'
		}).done(function(data){
			// empty json as the store has closed
			if(jQuery.isEmptyObject(data) == true)
			{
				console.log("The store had been closed");
				return;
			}
			else
				// print the available item
				print_avail_avail(data, store, target);
		}).fail(function(data){
			console.log("The store had been closed");
		});
	
	}, timeInt * 1000);

}

// to filter out all iPhone codes not match the requirement
// and return the array of iPhone users want to look at
function filter_model(phone_model, color, cap)
{
	var target = model;
	
	// select the taregt from model by remove not necessary model
	switch(phone_model)
	{
		case '6':
			target.splice(0, 9);
			break;
		case '6+':
			target.splice(9, 9);
			break;
		default:
			break;
	}

	// select the target from the model selected by remove not necessary color
	// remove the array from backward to prevent the length change
	switch(color)
	{
		case 'grey':
			for(var i = target.length-2; i > 0; i-=3)
				target.splice(i, 2);
			break;
		case 'silver':
			for(var i = target.length-1; i > 0; i-=3)
				target.splice(i, 2);
			// remove the leading grey
			target.splice(0, 1);
			break;
		case 'gold':
			for(var i = target.length-3; i > 0; i-=3)
				target.splice(i, 2);
			// remove the leading grey and silver
			target.splice(0, 2);
			break;
		default:
			break;
	}

	// to determine the capacity should choose by choose the element in defined array
	var final_target = [];
	switch(cap)
	{
		case 16:
			for(var i = 0, len = cap16.length; i < len; i++)
				if(target.indexOf(cap16[i]) != -1)
					final_target.push(cap16[i]);
			break;
		case 64:
			for(var i = 0, len = cap64.length; i < len; i++)
				if(target.indexOf(cap64[i]) != -1)
					final_target.push(cap64[i]);
			break;
		case 128:
			for(var i = 0, len = cap128.length; i < len; i++)
				if(target.indexOf(cap128[i]) != -1)
					final_target.push(cap128[i]);
			break;
		default:
			// user didn't specify the capacity
			final_target = target;
			break;
	}

	// for debug usage, recommanded the user to turn on so can see what it the result this script
	// will keep track
	if(debug == 1)
		console.log('The target is: ');
		for(var i = 0, len = final_target.length; i < len; i++)
			console.log('model: ' + models_name[final_target[i]]);

	return final_target;
}

// print the available iPhones at particular store
function print_avail_avail(ret_json, store, target)
{
	console.log('----------------------------------');
	for(var j = 0, len_j = store.length; j < len_j; j++)
	{
		var store_code = stores[store[j]];
		var store_item = ret_json[store_code];

		for(var i = 0, len = target.length; i < len; i++)
		{
			if(store_item[target[i]] == true)
				console.log('Available model: ' + models_name[target[i]] + ' @ ' + stores_name[store_code]);
		}
	}
}