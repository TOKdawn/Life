// [环形链表](https://leetcode-cn.com/problems/linked-list-cycle/) 
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    var fast = head,slow = head;
    if(fast == null){return false}
    while(1){
    if(fast.next && fast.next.next){
        fast = fast.next.next;
        slow = slow.next;
        if(fast == slow){
            return true;
        }
    }else{
        return false
    }
    }
};