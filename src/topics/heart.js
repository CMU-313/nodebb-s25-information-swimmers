// socket.io/hearts.js

'use strict';

const privileges = require('../privileges');
const db = require('../database');

const SocketHearts = module.exports;

/**
 * Toggle a heart on a given post.
 *
 * @param {object} socket - The socket of the connected user.
 * @param {object} data - The data payload, expected to include data.pid.
 * @returns {Promise<object>} - Resolves with an object { count, action }.
 */
SocketHearts.heart = async function (socket, data) {
	// Make sure the user is logged in and we got a valid post id.
	if (!socket.uid || !data || !data.pid) {
		throw new Error('[[error:invalid-data]]');
	}
	const { pid } = data;
	const key = `pid:${pid}:hearts`;

	// Check whether the user already hearted this post.
	const hasHearted = await db.isSetMember(key, socket.uid);
	let action;
	if (hasHearted) {
		// Remove the heart if it already exists (toggle off).
		await db.setRemove(key, socket.uid);
		action = 'removed';
	} else {
		// Otherwise add the heart.
		await db.setAdd(key, socket.uid);
		action = 'added';
	}
	// Get the new total heart count.
	const count = await db.getSetCard(key);
	return { count, action };
};

// Allow socket callbacks to return promises
require('../promisify')(SocketHearts);

module.exports = function (Topics) {
	Topics.initializeHeartPrivileges = async function () {
		const privs = ['topics:heart'];
		await privileges.categories.give(privs, 'registered-users');
	};

	Topics.toggleHeart = async function (tid) {
		const key = `topic:${tid}`;
		await db.incrementObjectField(key, 'heartCount');
		const count = await db.getObjectField(key, 'heartCount');
		return { count: parseInt(count, 10) || 0 };
	};

	Topics.isHearted = async function (tid, uid) {
		return await db.isSetMember(`tid:${tid}:hearts`, uid);
	};
};
