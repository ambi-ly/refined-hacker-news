import autoRefresh from '../features/auto-refresh';
import changeDeadCommentsColor from '../features/change-dead-comments-color';
import clickCommentIndentToToggle from '../features/click-comment-indent-to-toggle';
import clickRankToVoteUnvote from '../features/click-rank-to-vote-unvote';
import commentsUiTweaks from '../features/comments-ui-tweaks';
import keyBindingsOnInputFields from '../features/key-bindings-on-input-fields';
import keyBindingsOnItems from '../features/key-bindings-on-items';
import linkifyText from '../features/linkify-text';
import loadMoreLinksInNavbar from '../features/load-more-links-in-navbar';
import moreAccessibleFavorite from '../features/more-accessible-favorite';
import onLinkFocusComment from '../features/on-link-focus-comment';
import openStoryLinksInNewTab from '../features/open-story-links-in-new-tab';
import pastChooseDate from '../features/past-choose-date';
import prefillSubmitTitle from '../features/prefill-submit-title';
import profileLinksDropdown from '../features/profile-links-dropdown';
import replyWithoutLeavingPage from '../features/reply-without-leaving-page';
import showKarmaLeft from '../features/show-karma-left';
import showTopLeadersKarma from '../features/show-top-leaders-karma';
import showUserInfoOnHover from '../features/show-user-info-on-hover';
import sortStories from '../features/sort-stories';
import submissionTitleRemainingCharacters from '../features/submission-title-remaining-characters';
import toggleAllComments from '../features/toggle-all-comments';
import toggleAllReplies from '../features/toggle-all-replies';

import features from './features';
import {isItemJob} from './utils';

const featureList = [
	autoRefresh,
	changeDeadCommentsColor,
	clickCommentIndentToToggle,
	clickRankToVoteUnvote,
	commentsUiTweaks,
	keyBindingsOnInputFields,
	keyBindingsOnItems,
	linkifyText,
	loadMoreLinksInNavbar,
	moreAccessibleFavorite,
	onLinkFocusComment,
	openStoryLinksInNewTab,
	pastChooseDate,
	prefillSubmitTitle,
	profileLinksDropdown,
	replyWithoutLeavingPage,
	showKarmaLeft,
	showTopLeadersKarma,
	showUserInfoOnHover,
	sortStories,
	submissionTitleRemainingCharacters,
	toggleAllComments,
	toggleAllReplies
];

export async function initialiseAll() {
	const path = window.location.pathname;
	let isJob = false;

	if (path === '/item') {
		const params = new URLSearchParams(window.location.search.replace('?', '&'));
		const itemId = params.get('id');

		isJob = await isItemJob(itemId);
	}

	for (const feat of featureList) {
		features.add(feat, isJob, true);
	}
}

export async function initialiseSome(...args) {
	const path = window.location.pathname;
	let isJob = false;

	if (path === '/item') {
		const params = new URLSearchParams(window.location.search.replace('?', '&'));
		const itemId = params.get('id');

		isJob = await isItemJob(itemId);
	}

	for (const id of args) {
		const feat = featureList.find(f => f.id === id);
		features.add(feat, isJob);
	}
}
