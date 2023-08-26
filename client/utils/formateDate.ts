export const formatDate = (dateString: string | Date, type?: string) => {
    const date = new Date(dateString)
    if (!isNaN(date.getTime())) {
        if (type === 'notification') return date.toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
        return date.toLocaleString('en-US', { month: 'short', day: '2-digit' })
    }
    return "Invalid Date"
}

export const timeAgo = (createdDateTime: string): string => {
    const createdDate = new Date(createdDateTime);
    const currentDate = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDiff = currentDate.getTime() - createdDate.getTime();
  
    // Convert the time difference to days
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
    if (daysDiff >= 365) {
      const yearsDiff = Math.floor(daysDiff / 365);
      return `${yearsDiff} ${yearsDiff === 1 ? 'year' : 'years'} ago`;
    } else {
      return `${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago`;
    }
};