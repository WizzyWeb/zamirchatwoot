class Api::V1::Accounts::Conversations::BaseController < Api::V1::Accounts::BaseController
  before_action :conversation

  private

  def conversation
    @conversation ||= Current.account.conversations.find_by!(display_id: params[:conversation_id])
    if @current_user.agent?
      @conversation = nil unless can_view_conversations? && @conversation.present?
    end
    authorize @conversation.inbox, :show? if @conversation.present?
  end

  def can_view_conversations?
    team_ids = @current_user.teams.pluck(:id)
    team_ids.include? @conversation.team_id
  end
end
