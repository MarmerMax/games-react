import * as GameUserScoreActionsCreators from './gameUserScore';
import * as GameStateActionsCreators from './gameState';

export default {
    ...GameUserScoreActionsCreators,
    ...GameStateActionsCreators,
}