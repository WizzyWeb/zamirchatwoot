<template>
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">
    <template v-if="showMessageType">
      <fluent-icon
        v-if="isMessagePrivate"
        size="16"
        class="-mt-0.5 align-middle text-slate-600 dark:text-slate-300 inline-block"
        icon="lock-closed"
      />
      <fluent-icon
        v-else-if="messageByAgent"
        size="16"
        class="-mt-0.5 align-middle text-slate-600 dark:text-slate-300 inline-block"
        icon="arrow-reply"
      />
      <fluent-icon
        v-else-if="isMessageAnActivity"
        size="16"
        class="-mt-0.5 align-middle text-slate-600 dark:text-slate-300 inline-block"
        icon="info"
      />
    </template>
    <template>
<div>
      <div v-if="isReply">
          <div>
              Original Message: 
              <div v-if="replySource">
                <div v-if="replySource.message_type === 'image'">
                  <img :src="replySource.content" alt="Image message" />
                </div>
                <div v-else>
                  <pre>{{ replySource.content }}</pre>
                </div>
              </div>
              <div v-else>
                Loading original message...
              </div>
          </div>
          <div>
              Reply: 
              <pre>{{ message.content }}</pre>
          </div>
      </div>
      <div v-else>
        <pre>{{ message.content }}</pre>
      </div>
</div>
</template>
    <span v-if="message.content && isMessageSticker">
      <fluent-icon
        size="16"
        class="-mt-0.5 align-middle inline-block text-slate-600 dark:text-slate-300"
        icon="image"
      />
      {{ $t('CHAT_LIST.ATTACHMENTS.image.CONTENT') }}
    </span>
    <span v-else-if="message.content">
      {{ parsedLastMessage }}
    </span>
    <span v-else-if="message.attachments">
      <fluent-icon
        v-if="attachmentIcon && showMessageType"
        size="16"
        class="-mt-0.5 align-middle inline-block text-slate-600 dark:text-slate-300"
        :icon="attachmentIcon"
      />
      {{ $t(`${attachmentMessageContent}`) }}
    </span>
    <span v-else>
      {{ defaultEmptyMessage || $t('CHAT_LIST.NO_CONTENT') }}
    </span>
  </div>
</template>

<script>
import { MESSAGE_TYPE } from 'widget/helpers/constants';
import messageFormatterMixin from 'shared/mixins/messageFormatterMixin';
import { ATTACHMENT_ICONS } from 'shared/constants/messages';
import { mapState } from 'vuex';

export default {
  name: 'MessagePreview',
  mixins: [messageFormatterMixin],
  props: {
    message: {
      type: Object,
      required: true,
    },
    showMessageType: {
      type: Boolean,
      default: true,
    },
    defaultEmptyMessage: {
      type: String,
      default: '',
    },
  },
  methods: {
    truncate(text, length = 100) {
      if (text.length <= length) return text
      return text.substring(0, length) + '...'
    }
  },
  computed: {
    messageByAgent() {
      const { message_type: messageType } = this.message;
      return messageType === MESSAGE_TYPE.OUTGOING;
    },
    isMessageAnActivity() {
      const { message_type: messageType } = this.message;
      return messageType === MESSAGE_TYPE.ACTIVITY;
    },
    isMessagePrivate() {
      const { private: isPrivate } = this.message;
      return isPrivate;
    },
    parsedLastMessage() {
      const { content_attributes: contentAttributes } = this.message;
      const { email: { subject } = {} } = contentAttributes || {};
      return this.getPlainText(subject || this.message.content);
    },
    lastMessageFileType() {
      const [{ file_type: fileType } = {}] = this.message.attachments;
      return fileType;
    },
    attachmentIcon() {
      return ATTACHMENT_ICONS[this.lastMessageFileType];
    },
    attachmentMessageContent() {
      return `CHAT_LIST.ATTACHMENTS.${this.lastMessageFileType}.CONTENT`;
    },
    isMessageSticker() {
      return this.message && this.message.content_type === 'sticker';
    },
    ...mapState('messages', ['messages']),
    isReply() {
      return !!this.message.content_attributes?.in_reply_to_external_id;
    },
    replySource() {
      if (!this.isReply) return null;
      return this.messages[this.message.content_attributes.in_reply_to_external_id];
    },
  },
};
</script>
