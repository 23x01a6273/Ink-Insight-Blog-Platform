import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Search, 
  LogIn, 
  LogOut, 
  Plus, 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  ArrowRight, 
  Lock, 
  Mail, 
  Settings, 
  Image as ImageIcon, 
  Code, 
  ChevronDown, 
  BookOpen, 
  Clock, 
  User, 
  PenSquare, 
  Check, 
  Calendar, 
  ArrowLeft, 
  X, 
  Send, 
  Eye, 
  Bold, 
  Italic, 
  Quote, 
  Link as LinkIcon, 
  Sparkles,
  BookmarkCheck,
  CheckCircle2,
  Trash2
} from 'lucide-react';

import { Post, Comment, User as UserType } from './types';
import { INITIAL_POSTS, INITIAL_COMMENTS, CATEGORIES } from './data';

export default function App() {
  // Application State
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [commentsDict, setCommentsDict] = useState<Record<string, Comment[]>>(INITIAL_COMMENTS);
  const [currentUser, setCurrentUser] = useState<UserType | null>({
    fullName: "Cassandra Vance",
    email: "cassandra@insight.com",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC43bq9P7RjhJ0-1G9m4r0OS2I9nqSTQuYl3ODO9YmzGsWSX3nj7PTrpRMZLVv9XQkhlnipPcanZrKIdcmO8KBI9ys33FQa_Qcsa5FuANLmmrwZieIO1Jam2h8MmZDJGr-TJ-ZHCD90G0lLMLDDeXKogsrBXWDrtxFUpmjW_cgkqoHHXByBVR8gjclDTotxtlEY1Mu-zs0ipuXxxDNLDN7bo41MKjbAyYUDYAxss7e8reTLP0E2WxBxyf25fXjGN-Sa_lIm1WPH2pM"
  });

  // Navigation and view toggling
  const [currentView, setCurrentView] = useState<'home' | 'detail' | 'create' | 'auth'>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  // Interactive UI configurations
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Essays');
  const [bookmarks, setBookmarks] = useState<string[]>(['architecture-of-silence']);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  // Newsletter subscription
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Auth Page parameters
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  // Creation interface state
  const [createTitle, setCreateTitle] = useState('');
  const [createExcerpt, setCreateExcerpt] = useState('');
  const [createContent, setCreateContent] = useState('');
  const [createCategory, setCreateCategory] = useState('Philosophy');
  const [createReadingTime, setCreateReadingTime] = useState('5 min read');
  const [createTagsString, setCreateTagsString] = useState('');
  const [createTags, setCreateTags] = useState<string[]>(['meditation', 'focus']);
  const [createCoverUrl, setCreateCoverUrl] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuCDmYOeWhwigx_BLQEMKtm82DaVAUm7c7svrh0lcZ8iOa9psGHLBDAAQtAFeSSk1f6-FZooD5mMKHedGMmNLoC863u1MM6yQQ6ne8G4TLUN-Y2rO6W85qLv4A2H7AITYNLNBeGfkYNHB41UsnneCM6p9w4kW7M51k-C4cfBAlLFGPbyw5_Ym5aoU8-23vA8xpl0CpicxecI2yIz6fKCC3O1kWct8YuevqyMIQpYOFhawvsHgQyhHfsYsPeBtkpKF8NeLyKC0Ekf5U4');
  const [isScheduled, setIsScheduled] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [editLivePreview, setEditLivePreview] = useState(false);

  // Dialog notification state
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  // Comments creation state
  const [commentInput, setCommentInput] = useState('');
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState('');

  // Scroll to top on page switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedPost]);

  // Alert temporary message handler
  const triggerAlert = (text: string, type: 'success' | 'info' = 'success') => {
    setAlertMessage({ type, text });
    setTimeout(() => {
      setAlertMessage(null);
    }, 4000);
  };

  // Bookmark toggler
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(b => b !== id));
      triggerAlert("Removed from reading list", "info");
    } else {
      setBookmarks([...bookmarks, id]);
      triggerAlert("Saved to your reading list!", "success");
    }
  };

  // Like toggler
  const handleLikePost = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        const isLiked = p.likes > INITIAL_POSTS.find(orig => orig.id === id)!.likes;
        return {
          ...p,
          likes: isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
    
    // Update selectedPost as well if on details
    if (selectedPost && selectedPost.id === id) {
      const isLiked = selectedPost.likes > INITIAL_POSTS.find(orig => orig.id === id)!.likes;
      setSelectedPost(prev => prev ? {
        ...prev,
        likes: isLiked ? prev.likes - 1 : prev.likes + 1
      } : null);
    }
  };

  // Submit comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !selectedPost) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      authorName: currentUser?.fullName || "Guest Reader",
      authorAvatar: currentUser?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuC43bq9P7RjhJ0-1G9m4r0OS2I9nqSTQuYl3ODO9YmzGsWSX3nj7PTrpRMZLVv9XQkhlnipPcanZrKIdcmO8KBI9ys33FQa_Qcsa5FuANLmmrwZieIO1Jam2h8MmZDJGr-TJ-ZHCD90G0lLMLDDeXKogsrBXWDrtxFUpmjW_cgkqoHHXByBVR8gjclDTotxtlEY1Mu-zs0ipuXxxDNLDN7bo41MKjbAyYUDYAxss7e8reTLP0E2WxBxyf25fXjGN-Sa_lIm1WPH2pM",
      authorRole: currentUser ? "Member" : "Observer",
      text: commentInput,
      time: "Just now",
      likes: 0,
      replies: []
    };

    const currentPostComments = commentsDict[selectedPost.id] || [];
    setCommentsDict({
      ...commentsDict,
      [selectedPost.id]: [newComment, ...currentPostComments]
    });

    // Update comment counts
    setPosts(prev => prev.map(p => p.id === selectedPost.id ? { ...p, commentsCount: p.commentsCount + 1 } : p));
    setSelectedPost(prev => prev ? { ...prev, commentsCount: prev.commentsCount + 1 } : null);
    
    setCommentInput('');
    triggerAlert("Your reflection has been posted!", "success");
  };

  // Submit reply nested
  const handleAddReply = (commentId: string, text: string) => {
    if (!text.trim() || !selectedPost) return;

    const newReply: Comment = {
      id: `reply-${Date.now()}`,
      authorName: currentUser?.fullName || "Guest Reader",
      authorAvatar: currentUser?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuC43bq9P7RjhJ0-1G9m4r0OS2I9nqSTQuYl3ODO9YmzGsWSX3nj7PTrpRMZLVv9XQkhlnipPcanZrKIdcmO8KBI9ys33FQa_Qcsa5FuANLmmrwZieIO1Jam2h8MmZDJGr-TJ-ZHCD90G0lLMLDDeXKogsrBXWDrtxFUpmjW_cgkqoHHXByBVR8gjclDTotxtlEY1Mu-zs0ipuXxxDNLDN7bo41MKjbAyYUDYAxss7e8reTLP0E2WxBxyf25fXjGN-Sa_lIm1WPH2pM",
      authorRole: currentUser ? "Member" : "Observer",
      text: text,
      time: "Just now",
      likes: 0
    };

    const updatedComments = (commentsDict[selectedPost.id] || []).map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...(c.replies || []), newReply]
        };
      }
      return c;
    });

    setCommentsDict({
      ...commentsDict,
      [selectedPost.id]: updatedComments
    });

    // Update comment counts
    setPosts(prev => prev.map(p => p.id === selectedPost.id ? { ...p, commentsCount: p.commentsCount + 1 } : p));
    setSelectedPost(prev => prev ? { ...prev, commentsCount: prev.commentsCount + 1 } : null);

    setReplyTargetId(null);
    setReplyInput('');
    triggerAlert("Your reply was compiled successfully", "success");
  };

  // Add Comment Like
  const handleLikeComment = (commentId: string, replyId?: string) => {
    if (!selectedPost) return;
    const postComments = commentsDict[selectedPost.id] || [];

    const updatedComments = postComments.map(c => {
      if (!replyId && c.id === commentId) {
        return { ...c, likes: c.likes + 1 };
      }
      if (replyId && c.id === commentId) {
        return {
          ...c,
          replies: (c.replies || []).map(r => r.id === replyId ? { ...r, likes: r.likes + 1 } : r)
        };
      }
      return c;
    });

    setCommentsDict({
      ...commentsDict,
      [selectedPost.id]: updatedComments
    });
  };

  // Search filter implementation
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Essays' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured Post
  const featuredPost = posts.find(p => p.featured) || posts[0];

  // Subscription action
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    triggerAlert("Subscription activated! Prepare for your Sunday Sentiments.", "success");
  };

  // Login handler
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim() || !authPassword.trim()) return;

    if (authMode === 'login') {
      setCurrentUser({
        fullName: authName || "Marcus Aurelius",
        email: authEmail,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAr3rmpRkxu2e4GQQo7Sxy-ks2kp7BM0Md7I81X4XYVIeZWcrjduwpOkuiMxttSmh3euyVO2JRPJlND6LhNPbT9FmD0BatENZC4w5vmzOHaH1hiS2P8HQ1viu_bwOoq4FpnoocgVj7Wlg29aRTYSe6Rdr0hXJSrPh3IOHomO7GgCycDHkj5HKMGmKqPRo4c7VyZkvIdr3IIQxxk5XLQ-hCCx69IO00t7kOj-afOhXhiX19k4b9G2dCF6iP8Rlh-2Lkw4jOE9mNJCdM"
      });
      triggerAlert("Identity authenticated. Welcome back.", "success");
    } else {
      setCurrentUser({
        fullName: authName || "New Thought Leader",
        email: authEmail,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC43bq9P7RjhJ0-1G9m4r0OS2I9nqSTQuYl3ODO9YmzGsWSX3nj7PTrpRMZLVv9XQkhlnipPcanZrKIdcmO8KBI9ys33FQa_Qcsa5FuANLmmrwZieIO1Jam2h8MmZDJGr-TJ-ZHCD90G0lLMLDDeXKogsrBXWDrtxFUpmjW_cgkqoHHXByBVR8gjclDTotxtlEY1Mu-zs0ipuXxxDNLDN7bo41MKjbAyYUDYAxss7e8reTLP0E2WxBxyf25fXjGN-Sa_lIm1WPH2pM"
      });
      triggerAlert("Account registered and synchronized!", "success");
    }
    setCurrentView('home');
    setAuthEmail('');
    setAuthPassword('');
    setAuthName('');
  };

  // Publish Post Handler
  const handlePublishPost = () => {
    if (!createTitle.trim() || !createContent.trim()) {
      triggerAlert("Please enter a valid title and body text", "info");
      return;
    }

    const calculatedReadingTime = `${Math.max(2, Math.ceil(createContent.split(' ').length / 180))} min read`;

    const newPost: Post = {
      id: `p-${Date.now()}`,
      title: createTitle,
      excerpt: createExcerpt || createContent.substring(0, 140) + "...",
      content: createContent,
      category: createCategory,
      readingTime: calculatedReadingTime,
      authorName: currentUser?.fullName || "Guest Writer",
      authorAvatar: currentUser?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuCDmYOeWhwigx_BLQEMKtm82DaVAUm7c7svrh0lcZ8iOa9psGHLBDAAQtAFeSSk1f6-FZooD5mMKHedGMmNLoC863u1MM6yQQ6ne8G4TLUN-Y2rO6W85qLv4A2H7AITYNLNBeGfkYNHB41UsnneCM6p9w4kW7M51k-C4cfBAlLFGPbyw5_Ym5aoU8-23vA8xpl0CpicxecI2yIz6fKCC3O1kWct8YuevqyMIQpYOFhawvsHgQyhHfsYsPeBtkpKF8NeLyKC0Ekf5U4",
      authorRole: "Author",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      coverImage: createCoverUrl,
      likes: 0,
      commentsCount: 0,
      tags: createTags,
    };

    setPosts([newPost, ...posts]);
    setCommentsDict({ ...commentsDict, [newPost.id]: [] });

    // Reset Creation form
    setCreateTitle('');
    setCreateExcerpt('');
    setCreateContent('');
    setCreateCategory('Philosophy');
    setCreateTags(['meditation', 'focus']);
    
    setCurrentView('home');
    triggerAlert("Your insight was published into the void!", "success");
  };

  // Set individual tag elements
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && createTagsString.trim()) {
      e.preventDefault();
      const cleanTag = createTagsString.trim().replace('#', '').toLowerCase();
      if (!createTags.includes(cleanTag)) {
        setCreateTags([...createTags, cleanTag]);
      }
      setCreateTagsString('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setCreateTags(createTags.filter(t => t !== tagToRemove));
  };

  // Sign out helper
  const handleSignOut = () => {
    setCurrentUser(null);
    setUserDropdownOpen(false);
    triggerAlert("Identity revoked. Signed out.", "info");
  };

  // Select image trigger
  const handleSelectCover = (url: string) => {
    setCreateCoverUrl(url);
    triggerAlert("Featured cover image applied!", "success");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-accent-blue/30 overflow-x-hidden text-gray-100">
      
      {/* Toast Alert Notifications */}
      <AnimatePresence>
        {alertMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="glass-panel text-sm px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
              {alertMessage.type === 'success' ? (
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              ) : (
                <Sparkles size={16} className="text-accent-blue shrink-0 animate-pulse" />
              )}
              <span className="font-medium tracking-wide text-gray-200 whitespace-nowrap">{alertMessage.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Ambient Glowing Particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="ambient-glow absolute -top-48 -left-32 w-[500px] h-[500px] rounded-full bg-accent-blue/10"></div>
        <div className="ambient-glow absolute top-1/2 right-[-100px] w-[450px] h-[450px] rounded-full bg-accent-purple/8 bg-blend-screen" style={{ animationDelay: '-4s' }}></div>
        <div className="ambient-glow absolute bottom-[-150px] left-1/4 w-[350px] h-[350px] rounded-full bg-emerald-500/5" style={{ animationDelay: '-8s' }}></div>
      </div>

      {/* Primary Sticky Header */}
      <header className="fixed top-0 w-full z-40 bg-slate-bg/70 backdrop-blur-md border-b border-white/10 shadow-[0_32px_64px_-12px_rgba(128,131,255,0.08)]">
        <div className="flex justify-between items-center h-20 px-4 md:px-12 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <button 
              onClick={() => { setCurrentView('home'); setSelectedPost(null); }}
              className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white hover:text-accent-blue transition-colors cursor-pointer"
            >
              Ink & Insight
            </button>

            {/* Navigations (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              {['Philosophy', 'Minimalism', 'Cognitive Science'].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentView('home');
                    setSelectedPost(null);
                  }}
                  className={`text-sm font-medium tracking-wider transition-colors uppercase ${
                    selectedCategory === category && currentView === 'home'
                      ? 'text-accent-blue border-b-2 border-accent-blue pb-1'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
              <button
                onClick={() => {
                  setSelectedCategory('All Essays');
                  setCurrentView('home');
                  setSelectedPost(null);
                }}
                className={`text-sm font-medium tracking-wider transition-colors uppercase ${
                  selectedCategory === 'All Essays' && currentView === 'home'
                    ? 'text-accent-blue border-b-2 border-accent-blue pb-1'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Archive
              </button>
            </nav>
          </div>

          {/* User Controls and CTAs */}
          <div className="flex items-center gap-4">
            {/* Realtime Search Panel inside Nav */}
            <div className="relative hidden md:block w-48 xl:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search focus articles..."
                className="w-full bg-slate-surface border border-white/10 rounded-full py-2 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all shadow-inner"
              />
              <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {currentUser ? (
              <div className="flex items-center gap-3">
                {/* Create post action button */}
                <button
                  onClick={() => setCurrentView('create')}
                  className="bg-accent-blue text-slate-bg px-4 py-2 rounded-full font-semibold text-xs md:text-sm flex items-center gap-2 hover:bg-white active:scale-95 transition-all shadow-[0_0_20px_rgba(192,193,255,0.25)]"
                >
                  <Plus size={14} className="stroke-[3px]" />
                  <span className="hidden sm:inline">Draft insight</span>
                </button>

                {/* Profile Avatar Card Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 focus:outline-none"
                  >
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.fullName}
                      className="w-10 h-10 rounded-full object-cover border border-accent-blue/30 hover:border-accent-purple transition-all shadow-lg grayscale focus:grayscale-0"
                    />
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-56 rounded-2xl glass-panel p-2 shadow-2xl z-50 text-left"
                      >
                        <div className="px-3.5 py-2.5 border-b border-white/5">
                          <p className="text-xs text-accent-blue font-medium uppercase tracking-wider">Writer</p>
                          <p className="text-sm font-semibold text-white line-clamp-1">{currentUser.fullName}</p>
                          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{currentUser.email}</p>
                        </div>
                        <div className="p-1 space-y-1">
                          <button
                            onClick={() => { setCurrentView('create'); setUserDropdownOpen(false); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                          >
                            <PenSquare size={13} />
                            Compose Story
                          </button>
                          <button
                            onClick={() => { setSelectedCategory('All Essays'); setCurrentView('home'); setUserDropdownOpen(false); triggerAlert("Loaded your complete bookmarks!", "info"); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                          >
                            <BookmarkCheck size={13} />
                            Reading Lists ({bookmarks.length})
                          </button>
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all border-t border-white/5"
                          >
                            <LogOut size={13} />
                            Revoke Access
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setAuthMode('login'); setCurrentView('auth'); }}
                  className="text-gray-400 hover:text-white font-medium text-xs md:text-sm px-3.5 py-2 hover:bg-white/5 rounded-full transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthMode('register'); setCurrentView('auth'); }}
                  className="bg-accent-blue text-slate-bg px-5 py-2.5 rounded-full font-semibold text-xs md:text-sm active:scale-95 transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(192,193,255,0.4)]"
                >
                  Join Community
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Core View Switches */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          
          {/* VIEW: HOME */}
          {currentView === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="px-4 md:px-12 py-12 max-w-7xl mx-auto space-y-16"
            >
              
              {/* Featured Post Hero Overlap */}
              {featuredPost && searchQuery === '' && selectedCategory === 'All Essays' && (
                <div 
                  onClick={() => { setSelectedPost(featuredPost); setCurrentView('detail'); }}
                  className="group relative h-[500px] md:h-[650px] w-full rounded-2xl overflow-hidden cursor-pointer shadow-[0_32px_64px_-16px_rgba(0,0,0,0.65)]"
                >
                  {/* Background cover */}
                  <img 
                    src={featuredPost.coverImage} 
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-bg via-slate-bg/30 to-black/10"></div>
                  
                  {/* Floating Content Box card over hero */}
                  <div className="absolute bottom-6 md:bottom-12 left-4 right-4 md:left-12 md:right-12 max-w-2xl">
                    <div className="glass-panel p-6 md:p-10 rounded-2xl border border-white/10 space-y-4 md:space-y-6">
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className="py-1 px-4 rounded-full bg-accent-purple/20 text-accent-purple border border-accent-purple/10 font-medium text-xs tracking-wider uppercase">
                          Featured Essay
                        </span>
                        <span className="text-gray-400 text-xs flex items-center gap-1.5 font-mono">
                          <Clock size={11} /> {featuredPost.readingTime}
                        </span>
                      </div>
                      
                      <h1 className="font-serif text-2xl md:text-4.5xl text-white font-bold leading-tight group-hover:text-accent-blue transition-colors">
                        {featuredPost.title}
                      </h1>
                      
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedPost(featuredPost); setCurrentView('detail'); }}
                            className="bg-accent-blue text-slate-bg px-6 py-3 rounded-full font-semibold text-xs md:text-sm hover:bg-white active:scale-95 transition-all shadow-lg"
                          >
                            Read Essay
                          </button>
                          <span className="text-gray-400 text-xs hidden sm:inline-block">By <strong className="text-white font-medium">{featuredPost.authorName}</strong></span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={(e) => handleLikePost(featuredPost.id, e)}
                            className="p-2.5 rounded-full glass-pill hover:bg-pink-500/10 hover:text-pink-400 transition-all text-gray-400"
                            title="Express agreement"
                          >
                            <Heart size={15} className="fill-transparent" />
                          </button>
                          <button 
                            onClick={(e) => toggleBookmark(featuredPost.id, e)}
                            className={`p-2.5 rounded-full glass-pill transition-all ${bookmarks.includes(featuredPost.id) ? 'text-accent-blue' : 'text-gray-400'}`}
                            title="Keep in list"
                          >
                            <Bookmark size={15} className={bookmarks.includes(featuredPost.id) ? 'fill-current' : 'fill-transparent'} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tag filters Horizontal Chips */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs uppercase font-bold tracking-widest text-accent-blue">Curated Realms</h3>
                  <span className="text-xs text-gray-500 font-mono">Filter of thought ({filteredPosts.length} matches)</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                        selectedCategory === category
                          ? 'bg-accent-blue text-slate-bg font-bold shadow-[0_0_15px_rgba(192,193,255,0.3)]'
                          : 'bg-slate-surface border border-white/5 text-gray-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {category === 'All Essays' ? 'All Reflections' : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid block for Filtered Insights list */}
              <div className="space-y-8">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h2 className="font-serif text-2xl font-bold border-l-4 border-accent-blue pl-4 text-white">Latest Insights</h2>
                  
                  {/* Category clear helpers */}
                  {(selectedCategory !== 'All Essays' || searchQuery !== '') && (
                    <button 
                      onClick={() => { setSelectedCategory('All Essays'); setSearchQuery(''); }}
                      className="text-xs text-accent-blue hover:underline cursor-pointer"
                    >
                      Reset selection
                    </button>
                  )}
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="text-center py-20 bg-slate-surface/30 rounded-2xl border border-white/5 space-y-4">
                    <BookOpen size={48} className="mx-auto text-gray-600 animate-pulse" />
                    <p className="font-serif text-lg text-gray-400 italic">"The quiet mind finds no trace of what it seeks."</p>
                    <p className="text-xs text-gray-500">Your search criteria didn't yield any active essays. Try resetting terms.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                      <article 
                        key={post.id}
                        onClick={() => { setSelectedPost(post); setCurrentView('detail'); }}
                        className="group flex flex-col bg-slate-surface rounded-2xl ring-1 ring-white/5 overflow-hidden hover:ring-accent-blue/20 transition-all duration-300 cursor-pointer shadow-lg"
                      >
                        {/* Cover aspect ratio image */}
                        <div className="relative h-56 overflow-hidden">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-surface/80 via-transparent to-transparent"></div>
                          
                          <div className="absolute top-4 left-4">
                            <span className="px-3.5 py-1.5 rounded-full text-3xs font-bold uppercase tracking-wider bg-slate-bg/85 backdrop-blur-md text-accent-purple border border-white/5 shadow">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Article body metadata & title */}
                        <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                              <span>{post.date}</span>
                              <span>{post.readingTime}</span>
                            </div>
                            
                            <h3 className="font-serif text-lg md:text-xl font-bold leading-snug text-white group-hover:text-accent-blue transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            
                            <p className="text-gray-400 text-xs md:text-sm line-clamp-3 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <span className="text-xs text-gray-400">By <strong className="text-gray-200">{post.authorName}</strong></span>
                            
                            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={(e) => handleLikePost(post.id, e)}
                                className="flex items-center gap-1 text-xs text-gray-500 hover:text-pink-400 p-1.5 rounded-md hover:bg-white/5"
                              >
                                <Heart size={13} className={post.likes > INITIAL_POSTS.find(orig => orig.id === post.id)!.likes ? 'text-pink-400 fill-current' : ''} />
                                <span>{post.likes}</span>
                              </button>
                              
                              <button 
                                onClick={(e) => toggleBookmark(post.id, e)}
                                className={`p-1.5 rounded-md hover:bg-white/5 ${bookmarks.includes(post.id) ? 'text-accent-blue' : 'text-gray-500 hover:text-accent-blue'}`}
                              >
                                <Bookmark size={13} className={bookmarks.includes(post.id) ? 'fill-current' : ''} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* Load More Mock Indicator */}
                <div className="text-center pt-8">
                  <button 
                    onClick={() => triggerAlert("All selected essays are loaded comprehensively.", "info")}
                    className="glass-panel border-white/10 text-xs uppercase tracking-widest font-semibold text-gray-300 hover:border-accent-blue hover:text-white px-8 py-4 rounded-full active:scale-95 transition-all cursor-pointer"
                  >
                    Load More Essays
                  </button>
                </div>
              </div>

              {/* Sunday Sentiments Form container */}
              <section className="bg-slate-surface rounded-2xl p-8 md:p-12 text-center border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden my-16">
                <div className="absolute top-0 left-0 w-32 h-32 bg-accent-blue/5 rounded-full filter blur-xl"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent-purple/5 rounded-full filter blur-3xl"></div>

                <div className="relative z-10 max-w-xl mx-auto space-y-6">
                  <BookOpen size={40} className="mx-auto text-accent-blue animate-pulse" />
                  <h2 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-tight">Sunday Sentiments</h2>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Join over 45,000+ deep thinkers who receive a curated weekly digest of our best philosophy, essays, and cultural critiques.
                  </p>

                  {newsletterSubscribed ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-accent-blue/10 border border-accent-blue/20 rounded-xl p-4 text-accent-blue text-sm"
                    >
                      ✓ Your intellectual connection has been registered. Thank you.
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-4">
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Your cognitive email vector..."
                        className="flex-grow bg-slate-bg border-b-2 border-white/10 focus:border-accent-blue focus:ring-0 text-white placeholder-gray-500 py-3 px-4 outline-none transition-all text-sm"
                      />
                      <button
                        type="submit"
                        className="bg-accent-blue text-slate-bg px-6 py-3 rounded-full font-bold text-xs md:text-sm tracking-wider uppercase active:scale-95 hover:bg-white transition-all shadow-md whitespace-nowrap"
                      >
                        Subscribe Now
                      </button>
                    </form>
                  )}
                  <p className="text-3xs text-gray-500 uppercase tracking-widest font-mono">Strictly high-density discourse. Zero spam. Revoke anytime.</p>
                </div>
              </section>
            </motion.div>
          )}

          {/* VIEW: ARTICLE DETAIL VIEW */}
          {currentView === 'detail' && selectedPost && (
            <motion.div
              key="detail-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-0"
            >
              {/* Giant cover header with parallax cover image */}
              <div className="relative h-[400px] md:h-[600px] w-full">
                <img 
                  src={selectedPost.coverImage} 
                  alt={selectedPost.title}
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-bg via-slate-bg/30 to-transparent"></div>
                
                {/* Back button over image */}
                <button 
                  onClick={() => { setCurrentView('home'); setSelectedPost(null); }}
                  className="absolute top-6 left-4 md:left-12 bg-slate-bg/85 backdrop-blur-md rounded-full p-3.5 border border-white/10 hover:border-accent-blue hover:text-accent-blue text-gray-300 transition-all shadow-xl flex items-center gap-2 text-xs uppercase font-bold tracking-widest"
                >
                  <ArrowLeft size={14} />
                  Back to feed
                </button>
              </div>

              {/* Main detailed structure layout */}
              <div className="max-w-3xl mx-auto px-4 md:px-6 pb-24 -mt-24 relative z-10 space-y-12">
                
                {/* Visual Glass Article Title */}
                <div className="glass-panel p-8 md:p-12 rounded-2xl border border-white/10 space-y-6 shadow-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-full text-3xs font-bold uppercase tracking-wider bg-accent-blue/15 text-accent-blue border border-accent-blue/10">
                      {selectedPost.category}
                    </span>
                    <span className="text-gray-400 text-xs font-mono">{selectedPost.readingTime}</span>
                  </div>

                  <h1 className="font-serif text-3xl md:text-5xl text-white font-bold leading-tight">
                    {selectedPost.title}
                  </h1>

                  {/* Author Meta details */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <img 
                        src={selectedPost.authorAvatar} 
                        alt={selectedPost.authorName}
                        className="w-12 h-12 rounded-full object-cover grayscale"
                      />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">{selectedPost.authorName}</p>
                        <p className="text-xs text-gray-400 font-mono">{selectedPost.authorRole || 'Lead Thinker'} • {selectedPost.date}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => toggleBookmark(selectedPost.id)}
                        className={`p-3 rounded-full bg-slate-bg border border-white/5 hover:border-accent-blue transition-all ${bookmarks.includes(selectedPost.id) ? 'text-accent-blue' : 'text-gray-400 hover:text-accent-blue'}`}
                        title="Save to bookmarks"
                      >
                        <Bookmark size={15} className={bookmarks.includes(selectedPost.id) ? 'fill-current' : ''} />
                      </button>
                      <button 
                        onClick={() => {
                          const articleUrl = window.location.href;
                          navigator.clipboard.writeText(articleUrl);
                          triggerAlert("Article link copied securely!", "success");
                        }}
                        className="p-3 rounded-full bg-slate-bg border border-white/5 hover:border-accent-blue text-gray-400 hover:text-white transition-all"
                        title="Copy article URL"
                      >
                        <Share2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Core Essay Prose body block */}
                <article className="prose prose-invert max-w-none text-gray-300 font-serif text-base md:text-lg leading-relaxed space-y-6">
                  {selectedPost.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('##')) {
                      return (
                        <h2 key={index} className="font-serif text-2.5xl text-white font-bold mt-12 mb-4 leading-normal">
                          {paragraph.replace('##', '').trim()}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('>')) {
                      return (
                        <div key={index} className="my-10 glass-panel border-l-4 border-accent-blue p-8 italic text-white rounded-r-xl">
                          {paragraph.replace('>', '').trim()}
                        </div>
                      );
                    }
                    // Replace adapt formatting for bullet lists if any
                    return (
                      <p key={index} className="leading-relaxed text-gray-300">
                        {paragraph}
                      </p>
                    );
                  })}
                </article>

                {/* Stat likes button and comments stat */}
                <div className="flex justify-center items-center gap-6 py-12 border-y border-white/5">
                  <button 
                    onClick={() => handleLikePost(selectedPost.id)}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all group-hover:scale-105 group-active:scale-95 ${
                      selectedPost.likes > INITIAL_POSTS.find(orig => orig.id === selectedPost.id)!.likes
                        ? 'bg-pink-500/10 border border-pink-500/30 text-pink-400'
                        : 'glass-panel text-gray-300 hover:border-pink-500/40 hover:text-pink-400'
                    }`}>
                      <Heart size={18} className={selectedPost.likes > INITIAL_POSTS.find(orig => orig.id === selectedPost.id)!.likes ? 'fill-current' : ''} />
                    </div>
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider group-hover:text-pink-400 transition-colors">
                      {selectedPost.likes} Likes
                    </span>
                  </button>

                  <button 
                    onClick={() => {
                      document.getElementById('comments-deck')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-full glass-panel flex items-center justify-center transition-all group-hover:scale-105 hover:border-accent-blue/40 hover:text-accent-blue">
                      <MessageSquare size={18} className="text-accent-blue" />
                    </div>
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider group-hover:text-accent-blue transition-colors">
                      {selectedPost.commentsCount} reflections
                    </span>
                  </button>
                </div>

                {/* Comment collection threaded list section */}
                <section id="comments-deck" className="space-y-8 text-left">
                  <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-3">
                    <MessageSquare className="text-accent-blue" size={22} />
                    Reflections from the community
                  </h3>

                  {/* Comment composed form inputs */}
                  <form onSubmit={handleAddComment} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 shadow-xl">
                    <div className="flex gap-3 items-start">
                      <img 
                        src={currentUser?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuC43bq9P7RjhJ0-1G9m4r0OS2I9nqSTQuYl3ODO9YmzGsWSX3nj7PTrpRMZLVv9XQkhlnipPcanZrKIdcmO8KBI9ys33FQa_Qcsa5FuANLmmrwZieIO1Jam2h8MmZDJGr-TJ-ZHCD90G0lLMLDDeXKogsrBXWDrtxFUpmjW_cgkqoHHXByBVR8gjclDTotxtlEY1Mu-zs0ipuXxxDNLDN7bo41MKjbAyYUDYAxss7e8reTLP0E2WxBxyf25fXjGN-Sa_lIm1WPH2pM"} 
                        alt="Current user"
                        className="w-9 h-9 rounded-full object-cover border border-white/10 grayscale"
                      />
                      <div className="flex-grow">
                        <textarea
                          rows={3}
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder="Contribute your silent wisdom to the discourse..."
                          className="w-full bg-transparent border-0 ring-0 focus:ring-0 text-gray-100 placeholder-gray-500 text-sm outline-none resize-none px-1"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex gap-2">
                        <button 
                          type="button"
                          onClick={() => {
                            if (!currentUser) { triggerAlert("Authenticate to access premium text features", "info"); return; }
                            setCommentInput(prev => prev + " **philosophical focus**");
                          }}
                          className="p-1.5 rounded hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                          title="Insert bold markdown keyword"
                        >
                          <Bold size={14} />
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            if (!currentUser) { triggerAlert("Authenticate to access premium text features", "info"); return; }
                            setCommentInput(prev => prev + " *intellectual debate*");
                          }}
                          className="p-1.5 rounded hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                          title="Insert emphasis text"
                        >
                          <Italic size={14} />
                        </button>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={!commentInput.trim()}
                        className="bg-accent-blue text-slate-bg px-5 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase active:scale-95 disabled:opacity-40 disabled:pointer-events-none hover:bg-white transition-all shadow"
                      >
                        Post Comment
                      </button>
                    </div>
                  </form>

                  {/* Loop threaded discussion threads */}
                  <div className="space-y-6">
                    {(commentsDict[selectedPost.id] || []).length === 0 ? (
                      <p className="text-gray-500 italic text-center py-6 text-sm">Silence governs this page. Add your voice above.</p>
                    ) : (
                      (commentsDict[selectedPost.id] || []).map((comment) => (
                        <div key={comment.id} className="space-y-4">
                          
                          {/* Parent commentary card */}
                          <div className="flex gap-3 items-start">
                            <img 
                              src={comment.authorAvatar} 
                              alt={comment.authorName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-grow">
                              <div className="glass-panel p-6 rounded-2xl rounded-tl-none border border-white/10 space-y-3 shadow-sm text-left">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <span className="font-semibold text-sm text-white">{comment.authorName}</span>
                                    {comment.authorRole && (
                                      <span className="ml-2 text-[10px] bg-white/5 px-2 py-0.5 rounded text-accent-purple tracking-widest font-mono uppercase">
                                        {comment.authorRole}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-3xs text-gray-500 font-mono">{comment.time}</span>
                                </div>
                                
                                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                                  {comment.text}
                                </p>

                                <div className="flex items-center gap-4 pt-2 border-t border-white/5 text-xs text-gray-400">
                                  <button 
                                    onClick={() => handleLikeComment(comment.id)}
                                    className="flex items-center gap-1.5 hover:text-accent-blue transition-colors cursor-pointer"
                                  >
                                    <Heart size={12} className="fill-transparent" />
                                    <span>{comment.likes} agree</span>
                                  </button>
                                  
                                  <button 
                                    onClick={() => setReplyTargetId(replyTargetId === comment.id ? null : comment.id)}
                                    className="hover:text-accent-blue transition-colors cursor-pointer"
                                  >
                                    Reply
                                  </button>
                                </div>
                              </div>

                              {/* Nested replies list mapping */}
                              {comment.replies && comment.replies.map((reply) => (
                                <div key={reply.id} className="flex gap-3 items-start mt-4 ml-6 md:ml-10">
                                  <img 
                                    src={reply.authorAvatar} 
                                    alt={reply.authorName}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                  <div className="flex-grow glass-panel p-5 rounded-2xl rounded-tl-none border border-white/5 shadow-inner text-left">
                                    <div className="flex justify-between items-center mb-2">
                                      <span className="font-semibold text-xs text-white">{reply.authorName}</span>
                                      <span className="text-3xs text-gray-500 font-mono">{reply.time}</span>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                                      {reply.text}
                                    </p>
                                    <div className="flex items-center gap-3 pt-2 text-3xs text-gray-500 mt-2">
                                      <button 
                                        onClick={() => handleLikeComment(comment.id, reply.id)}
                                        className="flex items-center gap-1 hover:text-accent-blue transition-colors"
                                      >
                                        <Heart size={10} />
                                        <span>{reply.likes} helpful</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}

                              {/* Target custom Reply sub-form block */}
                              {replyTargetId === comment.id && (
                                <div className="mt-4 ml-6 md:ml-10 glass-panel p-4 rounded-xl border border-white/5 flex gap-2">
                                  <input 
                                    type="text"
                                    value={replyInput}
                                    onChange={(e) => setReplyInput(e.target.value)}
                                    placeholder={`Reply to ${comment.authorName}...`}
                                    className="flex-grow bg-slate-bg rounded-lg py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent-blue/30 border-0"
                                  />
                                  <button
                                    onClick={() => handleAddReply(comment.id, replyInput)}
                                    className="bg-accent-blue hover:bg-white text-slate-bg rounded-lg px-4 py-2 font-bold text-3xs uppercase tracking-widest transition-all"
                                  >
                                    Send
                                  </button>
                                </div>
                              )}

                            </div>
                          </div>

                        </div>
                      ))
                    )}
                  </div>
                </section>

              </div>
            </motion.div>
          )}

          {/* VIEW: COMPOSER CANVAS (Create/Edit post) */}
          {currentView === 'create' && (
            <motion.div
              key="create-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="px-4 md:px-12 py-12 max-w-7xl mx-auto"
            >
              <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-8">
                <div className="text-left">
                  <span className="text-3xs uppercase font-bold tracking-widest text-accent-blue font-mono">Drafting Studio</span>
                  <h1 className="font-serif text-3xl font-bold text-white mt-1">Refine Your Insight</h1>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setEditLivePreview(!editLivePreview)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                      editLivePreview 
                        ? 'bg-accent-purple text-slate-bg' 
                        : 'glass-panel text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <Eye size={13} />
                    {editLivePreview ? "Compose Canvas" : "Live Preview"}
                  </button>
                  <button 
                    onClick={handlePublishPost}
                    className="bg-accent-blue text-slate-bg px-6 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(192,193,255,0.3)] active:scale-95"
                  >
                    Publish Post
                  </button>
                </div>
              </div>

              {editLivePreview ? (
                /* Live Preview Mode of Drafting */
                <div className="max-w-3xl mx-auto space-y-10 text-left">
                  <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={createCoverUrl} 
                      alt="Cover Preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-bg via-transparent to-transparent"></div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-1.5 rounded-full text-3xs font-bold uppercase tracking-wider bg-accent-blue/10 text-accent-blue">
                        {createCategory}
                      </span>
                      <span className="text-gray-400 text-xs font-mono">Auto Calculated Time</span>
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-tight">
                      {createTitle || "Drafting Insight Title placeholder..."}
                    </h1>

                    <div className="flex gap-2">
                      {createTags.map(tag => (
                        <span key={tag} className="text-xs text-accent-purple font-mono bg-accent-purple/10 px-3 py-1 rounded-full border border-accent-purple/10">#{tag}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                      <img 
                        src={currentUser?.avatar} 
                        alt="Author Avatar" 
                        className="w-10 h-10 rounded-full object-fill grayscale"
                      />
                      <div>
                        <p className="text-xs font-semibold text-white">{currentUser?.fullName}</p>
                        <p className="text-3xs text-gray-400 uppercase font-mono tracking-wider">Compiling Draft Now</p>
                      </div>
                    </div>

                    <article className="prose prose-invert max-w-none text-gray-300 font-serif text-lg leading-relaxed pt-8 space-y-6">
                      {createContent ? createContent.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      )) : (
                        <p className="italic text-gray-500">Silence governs this page. Enter content inside the Compose Canvas first.</p>
                      )}
                    </article>
                  </div>
                </div>
              ) : (
                /* Standard Split Edit Compose View */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column Writing Fields */}
                  <div className="lg:col-span-2 space-y-6 text-left">
                    <div className="space-y-2">
                      <span className="text-2xs font-mono uppercase tracking-widest text-gray-400">Title of Prose</span>
                      <input 
                        type="text"
                        required
                        value={createTitle}
                        onChange={(e) => setCreateTitle(e.target.value)}
                        placeholder="Title of your insight..."
                        className="w-full bg-slate-surface border border-white/5 rounded-2xl p-5 text-lg md:text-2xl font-serif text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/30 transition-all font-bold"
                      />
                    </div>

                    {/* Rich text editing style toolbar */}
                    <div className="flex bg-slate-surface border border-white/5 rounded-xl p-2 gap-1 items-center">
                      <button 
                        type="button"
                        onClick={() => setCreateContent(prev => prev + " **bold text**")}
                        className="p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="Insert Bold Markdown"
                      >
                        <Bold size={16} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => setCreateContent(prev => prev + " *italicized text*")}
                        className="p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="Insert Italic Text"
                      >
                        <Italic size={16} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => setCreateContent(prev => prev + "\n## Section Header")}
                        className="p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1 font-mono text-xs"
                        title="Add Section Header"
                      >
                        <strong className="text-white">H2</strong>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setCreateContent(prev => prev + "\n> Wisdom from the void.")}
                        className="p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="Insert Blockquote"
                      >
                        <Quote size={16} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => setCreateContent(prev => prev + " [Link Anchor](https://example.org) ")}
                        className="p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="Add Web Link"
                      >
                        <LinkIcon size={16} />
                      </button>
                      
                      <div className="h-6 w-[1px] bg-white/10 mx-2" />
                      
                      <button 
                        type="button"
                        onClick={() => setCreateContent(prev => prev + "\n```typescript\nconst meditation = true;\n```")}
                        className="p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="Insert Source Code block"
                      >
                        <Code size={16} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <span className="text-2xs font-mono uppercase tracking-widest text-gray-400">Prose Content</span>
                      <textarea
                        rows={12}
                        required
                        value={createContent}
                        onChange={(e) => setCreateContent(e.target.value)}
                        placeholder="Begin articulating your refined thoughts here. Focus on clarity and the rhythm of your prose. The environment is designed to disappear, leaving only your words and the serenity of the void."
                        className="w-full bg-slate-surface border border-white/5 rounded-2xl p-5 text-base md:text-lg font-serif text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent-blue/30 transition-all leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <span className="text-2xs font-mono uppercase tracking-widest text-gray-400">Brief summary excerpt (Optional)</span>
                      <input 
                        type="text"
                        value={createExcerpt}
                        onChange={(e) => setCreateExcerpt(e.target.value)}
                        placeholder="A short introductory preview card sentence..."
                        className="w-full bg-slate-surface border border-white/5 rounded-xl p-4 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-accent-blue/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Right Column Configurations settings */}
                  <div className="space-y-6 text-left">
                    
                    {/* Select Category */}
                    <div className="glass-panel rounded-2xl p-6 space-y-4">
                      <h4 className="text-xs uppercase font-bold tracking-widest text-accent-blue">Settings Tray</h4>
                      
                      <div className="space-y-2 text-left">
                        <label className="text-xs text-gray-400 font-mono">Prose Category</label>
                        <select
                          value={createCategory}
                          onChange={(e) => setCreateCategory(e.target.value)}
                          className="w-full bg-slate-bg border border-white/5 rounded-xl p-3.5 text-xs text-white uppercase tracking-wider font-semibold focus:outline-none focus:border-accent-blue/40 cursor-pointer"
                        >
                          <option value="Philosophy">Philosophy</option>
                          <option value="Minimalism">Minimalism</option>
                          <option value="Cognitive Science">Cognitive Science</option>
                          <option value="Literature">Literature</option>
                          <option value="Digital Cultures">Digital Cultures</option>
                        </select>
                      </div>

                      <div className="space-y-2 text-left pt-2 border-t border-white/5">
                        <label className="text-xs text-gray-400 font-mono">Privacy Restriction</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setIsPrivate(false)}
                            className={`flex-grow py-2 rounded-full text-3xs uppercase font-bold tracking-widest transition-all ${
                              !isPrivate 
                                ? 'bg-accent-blue text-slate-bg'
                                : 'bg-slate-bg border border-white/5 text-gray-400'
                            }`}
                          >
                            Public
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsPrivate(true)}
                            className={`flex-grow py-2 rounded-full text-3xs uppercase font-bold tracking-widest transition-all ${
                              isPrivate 
                                ? 'bg-accent-blue text-slate-bg'
                                : 'bg-slate-bg border border-white/5 text-gray-400'
                            }`}
                          >
                            Private
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Tags Box */}
                    <div className="glass-panel rounded-2xl p-6 space-y-4">
                      <h4 className="text-xs uppercase font-bold tracking-widest text-accent-blue">Prose Metadata</h4>
                      
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 font-mono">Insert tag and press Enter</label>
                        <input
                          type="text"
                          value={createTagsString}
                          onChange={(e) => setCreateTagsString(e.target.value)}
                          onKeyDown={handleAddTag}
                          placeholder="e.g. mindfulness..."
                          className="w-full bg-slate-bg border border-b border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-accent-blue"
                        />
                      </div>

                      {createTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {createTags.map((tag) => (
                            <span 
                              key={tag} 
                              className="bg-accent-purple/15 text-accent-purple border border-accent-purple/15 px-2.5 py-1 rounded-full text-[10px] tracking-wide font-medium flex items-center gap-1"
                            >
                              #{tag}
                              <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-red-400">
                                <X size={10} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Cover Photo Custom selection */}
                    <div className="glass-panel rounded-2xl p-6 space-y-4">
                      <h4 className="text-xs uppercase font-bold tracking-widest text-accent-blue">Cover Vignette</h4>
                      
                      <div className="aspect-video relative rounded-xl overflow-hidden border border-dashed border-white/10 hover:border-accent-blue/35 transition-all group flex flex-col justify-center items-center gap-2 p-4 cursor-pointer">
                        <img 
                          src={createCoverUrl} 
                          alt="Cover Selector Preview" 
                          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-45 transition-all"
                        />
                        <div className="relative z-10 text-center space-y-1">
                          <ImageIcon size={22} className="mx-auto text-gray-400 group-hover:text-white" />
                          <p className="text-3xs text-gray-200 font-bold uppercase tracking-widest">Select Featured Cover</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Choose default ambient theme covers:</p>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuD3L7ZWP6PwyleWCsr1H16NArHON26qKSbHJQDJAs5P3xmwiD7hfZGTPGobVSAsSFfNdQUYSRCyCRoMQFxkehBifb7uc2zjXSsQ3h3XEUgl2PrDo0UZ9lmK6T2PBnp-6v3CD8hkvOrfQgdNKNYpcfvPeSfzfU1UdDzlIIo4dnikSiWjriR0Qyxn_l8kkNs4G-jMuPrJFWv6XQB8fdbGTdf9GJw8ntpdXNsyIbs4loig4zdkrqseXbeWz01N2Co7xygdOVnqTvwiFaY',
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuA8TK_LPuJzLkaoxD5zhcN_OkpMDJsLNmFL7aG-LvYEFvhSPh3TjXsaEg7yk4c0xBrEYw-TwybCMq-iTepT8u75TKkhq916DlbgR82I1iwFVeYSkumHDAjabwHGDjaoch3XBlA9pKVeZTDiFljL5rWg9Isb6BLN3Re8GT8ug8b0HneubjzFh5V7ZdyYyzkY7J1HuRhnpOIzQxYv-oJpRWG8HSLJF4u4hWWj9SbSdSMSpgMoAeXooF9_Q6yT07wioFI4pJXiEfCT7-w',
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuD-lO_76gi4TQo8NTu54JDeQoD2xOCRZDjNBIE6yt_LLjPwIAg9Om03lZ6O-SOYcoYk4yKqiwgqjLhMQIvqH7hVpKs6IbgBow4FhDKYsWeGPNHz5v7fC2BGagE-Nfiom3CC5n1m9lai3tJOhKJei1JkK1rnGBcWpzyX5Bwww32fDL-TBD_OT5fEefnec88A7IiS105fwS4Kq3wleeb1L-5hg9MvNaiArsMiA_oOY03v-zpAoTNGTUTeS2rOqAhfmZqHPxr35yhNGXU',
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuBldwYpgmqwxJfT7UGnNzfGvBCT_8KGpDnXm9bE4w8RYYUW1xwxg3f3u02HO0dHZ_TT03amjz0po6iEODjzqU0SY2A_Etl5G-qqUXPew6qVXJo3MvVvU6Vu_apuiCT50NzCAtgwBfWUcJs10SrdGCa12nCThtj2M18wWc3zfOlapa5uSaGsKG7erCCzvbJcmg71ykh_5KZQbM6kV75eNopydqimzYKbtv6nV6sxo_Um5TigrZQ6eOn0gPTFuWLfIE94shJehE9w9lc'
                          ].map((url, i) => (
                            <button
                              key={url}
                              type="button"
                              onClick={() => handleSelectCover(url)}
                              className={`aspect-video rounded-md overflow-hidden border-2 transition-all ${
                                createCoverUrl === url ? 'border-accent-blue' : 'border-transparent'
                              }`}
                            >
                              <img src={url} alt={`Cover option ${i}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Schedule options toggle switcher */}
                    <div className="glass-panel rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-300 font-mono">Scheduled Publication</span>
                        <button
                          type="button"
                          onClick={() => {
                            setIsScheduled(!isScheduled);
                            triggerAlert(isScheduled ? "Post will compile immediately on publish" : "Scheduled settings active", "info");
                          }}
                          className={`w-11 h-6 rounded-full p-1 relative transition-colors ${
                            isScheduled ? 'bg-accent-blue' : 'bg-slate-bg border border-white/15'
                          }`}
                        >
                          <span className={`block w-3.5 h-3.5 rounded-full transition-transform ${
                            isScheduled ? 'translate-x-5 bg-slate-bg' : 'translate-x-0 bg-gray-500'
                          }`} />
                        </button>
                      </div>
                      
                      {isScheduled && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2 pt-2 border-t border-white/5 text-xs text-left"
                        >
                          <label className="text-4xs uppercase tracking-widest text-accent-purple font-mono block">Publication Hour / Day</label>
                          <input 
                            type="datetime-local" 
                            defaultValue="2026-05-27T06:00"
                            className="w-full bg-slate-bg border border-white/5 rounded p-2 text-xs text-white"
                          />
                        </motion.div>
                      )}
                      
                      <p className="text-[10px] text-gray-500 italic">Configure automated temporal releases safely.</p>
                    </div>

                  </div>

                </div>
              )}
            </motion.div>
          )}

          {/* VIEW: AUTHENTICATION FLOW */}
          {currentView === 'auth' && (
            <motion.div
              key="auth-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="px-4 md:px-12 py-16 flex items-center justify-center min-h-[750px]"
            >
              <div className="w-full max-w-[480px] space-y-8">
                
                {/* Visual Header logo back home link */}
                <div className="text-center">
                  <button 
                    onClick={() => { setCurrentView('home'); setSelectedPost(null); }}
                    className="font-serif text-3xl font-bold tracking-tight text-white hover:text-accent-blue"
                  >
                    Ink & Insight
                  </button>
                </div>

                <div className="glass-panel p-8 md:p-10 rounded-2xl border border-white/10 text-left shadow-[0_32px_64px_-16px_rgba(128,131,255,0.08)]">
                  
                  <div className="mb-8">
                    <h2 className="font-serif text-3xl text-white font-bold leading-none mb-2">
                      {authMode === 'login' ? 'Welcome back.' : 'Cultivate thought.'}
                    </h2>
                    <p className="text-xs text-gray-400">
                      {authMode === 'login' 
                        ? 'The sanctuary of digital mind awaits your return.' 
                        : 'Register your signature and share reflections with the collective.'}
                    </p>
                  </div>

                  <form onSubmit={handleAuth} className="space-y-6">
                    {authMode === 'register' && (
                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 font-mono">Your Full Signature Name</label>
                        <input
                          type="text"
                          required
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          placeholder="e.g. Cassandra Vance"
                          className="w-full bg-slate-bg border-b-2 border-white/10 focus:border-accent-blue focus:ring-0 text-white placeholder-gray-600 block py-3.5 px-1 outline-none transition-all text-sm"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-mono">Email Vector</label>
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="your@insight.com"
                        className="w-full bg-slate-bg border-b-2 border-white/10 focus:border-accent-blue focus:ring-0 text-white placeholder-gray-600 block py-3.5 px-1 outline-none transition-all text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-gray-400 font-mono">Pass Key</label>
                        {authMode === 'login' && (
                          <button
                            type="button"
                            onClick={() => triggerAlert("Password rest vectors transmitted.", "info")}
                            className="text-3xs text-accent-blue uppercase tracking-widest font-mono"
                          >
                            Forgot?
                          </button>
                        )}
                      </div>
                      <input
                        type="password"
                        required
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-bg border-b-2 border-white/10 focus:border-accent-blue focus:ring-0 text-white placeholder-gray-600 block py-3.5 px-1 outline-none transition-all text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-accent-blue text-slate-bg py-4 rounded-full font-bold text-xs tracking-wider uppercase active:scale-95 hover:bg-white hover:shadow-[0_0_20px_rgba(192,193,255,0.45)] transition-all mt-4"
                    >
                      {authMode === 'login' ? 'Authenticate Signature' : 'Compile Account'}
                    </button>
                  </form>

                  {/* Continuing with Google mockup */}
                  <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                    <button
                      onClick={() => {
                        setCurrentUser({
                          fullName: "Marcus Aurelius",
                          email: "marcus@insight.com",
                          avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAr3rmpRkxu2e4GQQo7Sxy-ks2kp7BM0Md7I81X4XYVIeZWcrjduwpOkuiMxttSmh3euyVO2JRPJlND6LhNPbT9FmD0BatENZC4w5vmzOHaH1hiS2P8HQ1viu_bwOoq4FpnoocgVj7Wlg29aRTYSe6Rdr0hXJSrPh3IOHomO7GgCycDHkj5HKMGmKqPRo4c7VyZkvIdr3IIQxxk5XLQ-hCCx69IO00t7kOj-afOhXhiX19k4b9G2dCF6iP8Rlh-2Lkw4jOE9mNJCdM"
                        });
                        triggerAlert("Authenticated via Google Portal", "success");
                        setCurrentView('home');
                      }}
                      className="flex items-center justify-center gap-3 w-full h-14 rounded-full border border-white/10 text-white text-xs font-semibold uppercase tracking-widest hover:bg-white/5 transition-all cursor-pointer"
                    >
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC80rhQomj_8PSRfoixw2698QvTOsMQ0Jku9joXlvkckkvO-ZF5tpYRXOHREIF34Ucjuac8SobiQteCFsmAtEZ5EEFyFxN0deOkmE8-p-oB-b55N0JoZO17Rg2ODl2Wzin3s5aBl9vp3W1xIIzG-hno9KM9mqXW_3NvI6uiIs4JVIog0HQen_t8JnwNpXw3F7rnHeOxRh_xP-GGX8IUkX9NI4Gp6Tz2V6h_0LXd-vP9ZGQ4HcFieZY9g0_DmGWKkCbMu1pmNxCaS50" 
                        alt="Google portal launcher logo" 
                        className="w-5 h-5 grayscale"
                      />
                      <span>Continue with Google</span>
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-2">
                      {authMode === 'login' ? 'New to the collective?' : 'Already recorded on paper?'}
                      <button
                        onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                        className="text-accent-blue font-bold ml-1 hover:underline text-xs"
                      >
                        {authMode === 'login' ? 'Apply for Membership' : 'Sign in directly'}
                      </button>
                    </p>
                  </div>

                </div>

                <p className="text-center text-5xs uppercase tracking-widest text-gray-500">
                  "The quiet mind is the gateway to the infinite."
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Persistent Footer and Brand Directory */}
      <footer className="bg-slate-surface border-t border-white/10 py-16 text-left relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand section */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">Ink & Insight</h3>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              Refined thoughts for the modern mind. An editorial sanctuary for the intellectually curious. Created with precision, styled in darkness.
            </p>
            <p className="text-4xs text-gray-500 uppercase tracking-widest font-mono">
              © 2026 Ink & Insight. All rights reserved.
            </p>
          </div>

          {/* Nav Categories */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-accent-blue font-mono">Realm Directory</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              {['Philosophy', 'Minimalism', 'Cognitive Science', 'Digital Cultures'].map((cat) => (
                <li key={cat}>
                  <button 
                    onClick={() => { setSelectedCategory(cat === 'Digital Cultures' ? 'All Essays' : cat); setCurrentView('home'); setSelectedPost(null); }}
                    className="hover:text-accent-purple transition-colors cursor-pointer"
                  >
                    {cat} Group
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social connections */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-accent-blue font-mono">Social Vectors</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#" className="hover:text-accent-purple transition-colors">Digital Newsletter</a></li>
              <li><a href="#" className="hover:text-accent-purple transition-colors">Intellectual Threads</a></li>
              <li><a href="#" className="hover:text-accent-purple transition-colors">Aesthetic Instagram</a></li>
              <li><a href="#" className="hover:text-accent-purple transition-colors">RSS Feed Archive</a></li>
            </ul>
          </div>

          {/* Legal vectors */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-accent-blue font-mono">Constitutional Legal</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#" className="hover:text-accent-purple transition-colors">Concealed Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent-purple transition-colors">Intellectual Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent-purple transition-colors font-mono uppercase text-3xs tracking-widest">AIDA Verified Protocol</a></li>
            </ul>
          </div>

        </div>
      </footer>

    </div>
  );
}
